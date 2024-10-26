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

export default async function EventPage({params}: {params: {event: string}}) {
    const event = await eventRepository.findById(params.event);
    const host = event.hostId ? await universityService.getById(event.hostId) : null;
    const matches = await matchService.fromMeet(event.id);
    if (matches.length === 0) {
        return (
            <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
                <EventHeader title={event.displayName} isoDate={event.startDate.toISOString()} host={host} />
                <Card className="p-6">We currently don&apos;t have results for this event. Come back later!</Card>
            </main>
        );
    }
    const womensMatches = <MatchesCard title="Women's Matches" matches={matches.filter((match) => match.gender === Gender.WOMEN)} />;
    const mensMatches = <MatchesCard title="Men's Matches" matches={matches.filter((match) => match.gender === Gender.MEN)} />;
    const bouts: Bout[] = await boutService.getFromMeet(event.id);
    const fencers = mapFencerWithRecordToObject(recordService.calculateRecordsFromBouts(await fencerService.getFromMeet(event.id), bouts));
    const mensTeams = await universityService.getFromMeet(event.id, Gender.MEN);
    const womensTeams = await universityService.getFromMeet(event.id, Gender.WOMEN);
    const womensTeamsSection = (
        <ListCard title="Women's Teams">
            {womensTeams.map((team) => (
                <TeamRow team={team} key={team.id} genderPath="womens" />
            ))}
        </ListCard>
    );
    const mensTeamsSection = (
        <ListCard title="Men's Teams">
            {mensTeams.map((team) => (
                <TeamRow team={team} key={team.id} genderPath="mens" />
            ))}
        </ListCard>
    );
    const fencersSection = (
        <ListCard title="Fencer Stats">
            <FilteredFencersByWeaponAndGender fencers={fencers} />
        </ListCard>
    );
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <EventHeader title={event.displayName} isoDate={event.startDate.toISOString()} host={host} />
            <AdaptiveTiles
                elements={[
                    [
                        {title: "Mens's Teams", content: mensTeamsSection},
                        {title: "Men's Matches", content: mensMatches},
                    ],
                    [
                        {title: "Womens's Teams", content: womensTeamsSection},
                        {title: "Women's Matches", content: womensMatches},
                    ],
                    [{title: 'Fencers', content: fencersSection}],
                ]}
                defaultOnMobile="Women's Matches"
            />
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
