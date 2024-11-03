import Date from '~/components/date';
import {Card} from '~/components/ui/card';
import MatchesCard from './matches-card';
import Host from '~/components/host';
import {boutService, fencerService, matchService, recordService, universityService} from '~/services';
import ListCard from '~/components/list-card';
import {AdaptiveTiles} from '~/components/adaptive-tiles';
import type {Bout} from '~/models/Bout';
import {Gender} from '~/models/Gender';
import FilteredFencersByWeaponAndGender from '~/components/filtered-fencer-table-by-weapon-and-gender';
import TeamRow from '~/components/team-row';
import {mapFencerWithRecordToObject} from '~/helpers/objectMappers';
import {eventRepository} from '~/repositories';
import type {University2} from '~/models/University2';
import type {Metadata} from 'next';
import type {Event} from '~/models/Event';

export async function generateMetadata({params}: {params: {event: string}}): Promise<Metadata> {
    const event = await eventRepository.findById(params.event);
    const title = `${event.displayName} Results - NCAA Fencing`;
    const description = `Check out results and individual stats for ${event.displayName}`;
    return {
        title: title,
        description: description,
        openGraph: {
            images: [`/team-icons/${event.hostId}`],
            title: title,
            description: description,
        },
    };
}

export async function generateStaticParams() {
    const events = await eventRepository.findAll();
    const paths = events.map((event) => ({
        event: event.id,
    }));
    return paths;
}

export const dynamicParams = false;
export const revalidate = false;

export default async function EventPage({params}: {params: {event: string}}) {
    const event = await eventRepository.findById(params.event);
    const host = event.hostId ? await universityService.getById(event.hostId) : null;
    if (event.hasResults === false) {
        return <NoResultsFallback event={event} host={host} />;
    }
    const matches = await matchService.fromMeet(event.id);
    if (matches.length === 0) {
        return <NoResultsFallback event={event} host={host} />;
    }
    const womensMatches = matches.filter((match) => match.gender === Gender.WOMEN);
    const womensMatchesSection = womensMatches.length > 0 ? <MatchesCard title="Women's Matches" matches={womensMatches} /> : null;
    const mensMatches = matches.filter((match) => match.gender === Gender.MEN);
    const mensMatchesSection = mensMatches.length > 0 ? <MatchesCard title="Men's Matches" matches={mensMatches} /> : null;
    const bouts: Bout[] = await boutService.getFromMeet(event.id);
    const fencers = mapFencerWithRecordToObject(recordService.calculateRecordsFromBouts(await fencerService.getFromMeet(event.id), bouts));
    const mensTeams = await universityService.getFromMeet(event.id, Gender.MEN);
    const womensTeams = await universityService.getFromMeet(event.id, Gender.WOMEN);
    const womensTeamsSection =
        womensTeams.length > 0 ? (
            <ListCard title="Women's Teams">
                {womensTeams.map((team) => (
                    <TeamRow team={team} key={team.id} gender={Gender.WOMEN} />
                ))}
            </ListCard>
        ) : null;
    const mensTeamsSection =
        mensTeams.length > 0 ? (
            <ListCard title="Men's Teams">
                {mensTeams.map((team) => (
                    <TeamRow team={team} key={team.id} gender={Gender.MEN} />
                ))}
            </ListCard>
        ) : null;
    const fencersSection = (
        <ListCard title="Fencer Stats">
            <FilteredFencersByWeaponAndGender fencers={fencers} />
        </ListCard>
    );
    const matchesRow = [];
    if (mensMatches.length > 0) {
        matchesRow.push({
            title: "Men's Matches",
            content: mensMatchesSection,
        });
    }
    if (womensMatches.length > 0) {
        matchesRow.push({
            title: "Women's Matches",
            content: womensMatchesSection,
        });
    }
    const teamsRow = [];
    if (mensTeams.length > 0) {
        teamsRow.push({
            title: "Men's Teams",
            content: mensTeamsSection,
        });
    }
    if (womensTeams.length > 0) {
        teamsRow.push({
            title: "Women's Teams",
            content: womensTeamsSection,
        });
    }
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <EventHeader title={event.displayName} isoDate={event.startDate.toISOString()} host={host} />
            <AdaptiveTiles elements={[matchesRow, teamsRow, [{title: 'Fencers', content: fencersSection}]]} defaultOnMobile="Women's Matches" />
        </main>
    );
}

function EventHeader({title, isoDate, host}: {title: string; isoDate: string; host: University2 | null}) {
    return (
        <Card className="flex flex-col p-6">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-4">
                    <h2 className="text-xl font-extrabold md:text-4xl">{title}</h2>
                    {host && <Host university={host} className="text-xl font-bold" />}
                </div>
                <Date isoDate={isoDate} />
            </div>
        </Card>
    );
}

function NoResultsFallback({event, host}: {event: Event; host: University2 | null}) {
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <EventHeader title={event.displayName} isoDate={event.startDate.toISOString()} host={host} />
            <Card className="p-6">We currently don&apos;t have results for this event. Come back later!</Card>
        </main>
    );
}
