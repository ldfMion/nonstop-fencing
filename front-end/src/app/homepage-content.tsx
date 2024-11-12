import {getHomePageFencers, getHomePageTeams} from '~/api';
import PageHeading from '~/components/page-heading';
import StandingsCard from '~/components/list-card';
import getHomePageSquads from '~/api/getHomePageSquads';
import SeasonDropdown from '~/components/season-dropdown';
import type {ISeason} from '~/models/Season';
import {Season} from '~/models/Season';
import {Gender} from '~/models/Gender';
import type {Fencer} from '~/models/Fencer';
import type {University2} from '~/models/University2';
import type {HasRecord} from '~/models/HasRecord';
import TeamRow from '~/components/team-row';
import FencerRow from '~/components/fencer-row';
import {eventRepository} from '~/repositories';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '~/components/ui/carousel';
import {EventCard} from '~/components/event-card';
import {Button} from '~/components/ui/button';
import Link from 'next/link';
import {TeamList} from '~/components/team-list';
import {PreviewFencerList} from '~/components/preview-fencer-list';

export default async function HomePageContent({season}: {season: ISeason}) {
    const fencers = await getHomePageFencers(season);
    const squads = await getHomePageSquads(season);
    return (
        <main className="flex flex-col gap-2 px-6">
            {season.endYear == 2025 && (
                <>
                    <div className="flex flex-row items-center justify-between">
                        <PageHeading>Events</PageHeading>
                        <Button variant="link" className="text-foreground">
                            <Link href="24-25/events">See All Events</Link>
                        </Button>
                    </div>
                    <EventCarousel season={season} />
                </>
            )}
            <div className="flex flex-row items-center justify-between">
                <PageHeading>Fencers</PageHeading>
                <SeasonDropdown selectedSeason={{...season}} seasons={[{...new Season(2024)}, {...new Season(2025)}]} />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <PreviewFencerList fencers={fencers.mens.foil} title="Men's Foil" url={`${season.displayNameShort}/mens/foil/fencers`} />
                <PreviewFencerList fencers={fencers.mens.epee} title="Men's Epee" url={`${season.displayNameShort}/mens/epee/fencers`} />
                <PreviewFencerList fencers={fencers.mens.saber} title="Men's Saber" url={`${season.displayNameShort}/mens/saber/fencers`} />
                <PreviewFencerList fencers={fencers.womens.foil} title="Women's Foil" url={`${season.displayNameShort}/womens/foil/fencers`} />
                <PreviewFencerList fencers={fencers.womens.epee} title="Women's Epee" url={`${season.displayNameShort}/womens/epee/fencers`} />
                <PreviewFencerList fencers={fencers.womens.saber} title="Women's Saber" url={`${season.displayNameShort}/womens/saber/fencers`} />
            </div>
            <PageHeading>Teams</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <TeamListWrapper gender={Gender.MEN} season={season} />
                <TeamListWrapper gender={Gender.WOMEN} season={season} />
            </div>
            <PageHeading>Squads</PageHeading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <SquadList
                    squads={squads.womens.foil}
                    title="Women's Foil"
                    url={`${season.displayNameShort}/womens/foil/squads`}
                    gender={Gender.WOMEN}
                />
                <SquadList
                    squads={squads.womens.epee}
                    title="Women's Epee"
                    url={`${season.displayNameShort}/womens/epee/squads`}
                    gender={Gender.WOMEN}
                />
                <SquadList
                    squads={squads.womens.saber}
                    title="Women's Saber"
                    url={`${season.displayNameShort}/womens/saber/squads`}
                    gender={Gender.WOMEN}
                />
                <SquadList squads={squads.mens.foil} title="Men's Foil" url={`${season.displayNameShort}/mens/foil/squads`} gender={Gender.MEN} />
                <SquadList squads={squads.mens.epee} title="Men's Epee" url={`${season.displayNameShort}/mens/epee/squads`} gender={Gender.MEN} />
                <SquadList squads={squads.mens.saber} title="Men's Saber" url={`${season.displayNameShort}/mens/saber/squads`} gender={Gender.MEN} />
            </div>
        </main>
    );
}

async function TeamListWrapper({gender, season}: {gender: Gender; season: ISeason}): Promise<JSX.Element> {
    const teams = await getHomePageTeams(season, gender);
    const genderPath = gender === Gender.MEN ? 'mens' : 'womens';
    const title = gender === Gender.MEN ? "Men's" : "Women's";
    const url = `${season.displayNameShort}/${genderPath}/teams`;
    return <TeamList teams={teams} url={url} gender={gender} title={title} />;
}

function SquadList({squads, title, url, gender}: {squads: (University2 & HasRecord)[]; title: string; gender: Gender; url: string}): JSX.Element {
    return (
        <StandingsCard title={title} key={title} titleHref={url}>
            {squads.map((squad) => (
                <TeamRow team={squad} gender={gender} key={squad.id} />
            ))}
        </StandingsCard>
    );
}

async function EventCarousel({season}: {season: ISeason}): Promise<JSX.Element> {
    const events = (await eventRepository.findBySeason(season))
        .filter((event) => event.hasResults)
        .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    return (
        <div className="w-full">
            <Carousel className="">
                <CarouselContent className="flex flex-row items-stretch">
                    {events.map((event) => (
                        <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                            <EventCard event={event} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 -translate-x-1/2 bg-white" />
                <CarouselNext className="absolute right-0 translate-x-1/2 bg-white" />
            </Carousel>
        </div>
    );
}
