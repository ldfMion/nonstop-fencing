import Date from '~/components/date';
import {Card} from '~/components/ui/card';
import MatchesCard from './matches-card';
import Host from '~/components/host';
import {University} from '~/models/University';
import getUniversity from '~/api/getUniversity';
import {matchRepository} from '~/repositories';
import {boutService, fencerService, recordService, universityService} from '~/services';
import FilteredFencersByWeapon from '~/components/filtered-fencer-table-by-weapon';
import ListCard from '~/components/list-card';
import {AdaptiveTiles} from '~/components/adaptive-tiles';
import {Bout} from '~/models/Bout';
import {Gender} from '~/models/Gender';
import RankingRow from '~/components/ranking-row';
import {Fragment} from 'react';

const EVENT_INFO = {
    title: 'OSU Duals',
    date: '2024-9-29',
    id: '1',
    hostId: 'ohiostate',
};

export default async function OsuOpenPage() {
    const host = await getUniversity(EVENT_INFO.hostId);
    const matches = await matchRepository.findByMeetId(EVENT_INFO.id);
    const matchesCard = <MatchesCard matches={matches} />;
    const bouts: Bout[] = await boutService.getFromMeet(EVENT_INFO.id);
    const fencers = recordService.calculateRecordsFromBouts(await fencerService.getFromMeet(EVENT_INFO.id), bouts);
    const universities = await universityService.getFromMeet(EVENT_INFO.id);
    const mensTeams = recordService.calculateRecordsFromMatches(
        universities,
        matches.filter((match) => match.gender === Gender.MEN),
    );
    const womensTeams = recordService.calculateRecordsFromMatches(
        universities,
        matches.filter((match) => match.gender === Gender.WOMEN),
    );
    const teamsSection = (
        <Fragment>
            <ListCard title="Women's Teams">
                {womensTeams.map((team) => (
                    <RankingRow key={team.id} name={team.displayNameShort} iconUniversityId={team.id} record={team.record} href={`/womens/universities/${team.id}`} />
                ))}
            </ListCard>
            <ListCard title="Men's Teams">
                {mensTeams.map((team) => (
                    <RankingRow key={team.id} name={team.displayNameShort} iconUniversityId={team.id} record={team.record} href={`/mens/universities/${team.id}`} />
                ))}
            </ListCard>
        </Fragment>
    );
    const fencersSection = (
        <ListCard title="Fencers">
            <FilteredFencersByWeapon fencers={fencers} />
        </ListCard>
    );
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <EventHeader title={EVENT_INFO.title} isoDate={EVENT_INFO.date} host={host} />
            <AdaptiveTiles
                elements={[
                    [
                        {title: 'Teams', content: teamsSection},
                        {title: 'Matches', content: matchesCard},
                    ],
                    [{title: 'Fencers', content: fencersSection}],
                ]}
                defaultOnMobile="Matches"
            />
        </main>
    );
}

function EventHeader({title, isoDate, host}: {title: string; isoDate: string; host: University}) {
    return (
        <Card className="flex flex-col p-6">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-4">
                    <h2 className="text-xl font-extrabold md:text-4xl">{title}</h2>
                    <Host university={host} className="text-xl font-bold" />
                </div>
                <Date isoDate={isoDate} />
            </div>
        </Card>
    );
}
