import {Card, CardTitle} from '~/components/ui/card';
import {boutService, fencerService, matchService, recordService, universityService} from '~/services';
import type {Bout} from '~/models/Bout';
import {Gender} from '~/models/Gender';
import {eventRepository} from '~/repositories';
import {TeamList} from '~/components/team-list';
import {getTopN} from '~/helpers/getTopN';
import {PreviewFencerList} from '~/components/preview-fencer-list';
import MatchRowWithoutPerspective from '~/components/match-row/match-row-without-perspective';
import type {Match2} from '~/models/Match2';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '~/components/ui/carousel';
import {Button} from '~/components/ui/button';
import Link from 'next/link';

const NUM_TEAMS = 3;
const NUM_FENCERS = 10;
// const NUM_MATCHES = 6;

export default async function EventPage({params}: {params: {event: string}}) {
    const event = await eventRepository.findById(params.event);
    if (event.hasResults === false) {
        return <NoResultsFallback />;
    }
    const womensMatches = await matchService.fromMeet(event.id, Gender.WOMEN);
    const mensMatches = await matchService.fromMeet(event.id, Gender.MEN);
    if (womensMatches.length === 0 && mensMatches.length === 0) {
        return <NoResultsFallback />;
    }
    const bouts: Bout[] = await boutService.getFromMeet(event.id);
    const fencers = getTopN(recordService.calculateRecordsFromBouts(await fencerService.getFromMeet(event.id), bouts), NUM_FENCERS);
    const mensTeams = getTopN(await universityService.getFromMeet(event.id, Gender.MEN), NUM_TEAMS);
    const womensTeams = getTopN(await universityService.getFromMeet(event.id, Gender.WOMEN), NUM_TEAMS);
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <MatchCarousel matches={womensMatches} title="Women's" url="matches" />
            <MatchCarousel matches={mensMatches} title="Men's" url="matches" />
            <div className="md:-order-1 md:row-span-3">
                <PreviewFencerList fencers={fencers} title="Fencers" url="fencers" />
            </div>
            {womensTeams.length > 0 && <TeamList teams={womensTeams} gender={Gender.WOMEN} title="Women's Teams" url="teams" />}
            {mensTeams.length > 0 && <TeamList teams={mensTeams} gender={Gender.MEN} title="Men's Teams" url="teams" />}
        </div>
    );
}

function NoResultsFallback() {
    return <Card className="p-6">We currently don&apos;t have results for this event. Come back later!</Card>;
}

async function MatchCarousel({matches, title, url}: {matches: Match2[]; title: string; url: string}): Promise<JSX.Element> {
    return (
        <Carousel className="md:col-span-2">
            <Card className="p-4">
                <div className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <Button variant="link" className="text-foreground">
                        <Link href={url}>See All Matches</Link>
                    </Button>
                </div>
                <CarouselContent className="flex flex-row items-stretch">
                    {matches.map((match) => (
                        <CarouselItem key={match.id} className="flex flex-row items-start lg:basis-1/2 xl:basis-1/3">
                            <MatchRowWithoutPerspective match={match} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 -translate-x-1/3 bg-white" />
                <CarouselNext className="absolute right-0 translate-x-1/3 bg-white" />
            </Card>
        </Carousel>
    );
}
