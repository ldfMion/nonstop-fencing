import getUniversityRecord from 'helpers/getUniversityRecord';
import parseTeam from 'helpers/parseTeam';
import Link from 'next/link';
import getFencersFromUniversity from '~/api/getFencersFromUniversity';
import getMatchesFromUniversity from '~/api/getMatchesFromUniversity';
import getUniversity from '~/api/getUniversity';
import FilteredFencerTable from '~/components/filtered-fencer-table';
import MatchRow from '~/components/match-row';
import Record from '~/components/record';
import StandingsCard from '~/components/list-card';
import TeamIcon from '~/components/team-icon';
import {Card} from '~/components/ui/card';
import {Tabs, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {Team} from '~/models/FencerSummary';

export default async function University({params}: {params: {university: string; team: string}}) {
    const university = await getUniversity(params.university);
    if (!university) {
        return <p>University not found</p>;
    }
    const team = parseTeam(params.team);
    const fencers = await getFencersFromUniversity(university.id, team);
    const matches = await getMatchesFromUniversity(university.id, team);
    const universityRecord = await getUniversityRecord(university.id, team);
    return (
        <main className="flex flex-col items-stretch gap-5 p-6">
            <Card className="flex flex-row gap-6 p-6">
                <TeamIcon universityId={university.id} size={100} />
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-extrabold">{university.displayNameLong}</h2>
                        <p className="text-lg font-bold">{university.region}</p>
                    </div>
                    <Record record={universityRecord} />
                </div>
            </Card>
            <Tabs
                defaultValue={team == Team.MEN ? 'men' : 'women'}
                className="w-[400px] self-center"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <Link href="./men" legacyBehavior>
                        <TabsTrigger value="men">Men's</TabsTrigger>
                    </Link>
                    <Link href="./women" legacyBehavior>
                        <TabsTrigger value="women">Women's</TabsTrigger>
                    </Link>
                </TabsList>
            </Tabs>
            <div className="flex flex-col gap-5 md:flex-row md:items-start [&>*]:grow">
                <StandingsCard title="Squad">
                    <FilteredFencerTable
                        className="justify-start px-4"
                        fencers={fencers.map((fencer) => fencer.toObject!())}
                    />
                </StandingsCard>
                <StandingsCard title="Fixtures">
                    {matches.map((match) => (
                        <MatchRow
                            match={match}
                            key={match.teamAId + match.teamBId + match.date}
                            perspective={university}
                        />
                    ))}
                </StandingsCard>
            </div>
        </main>
    );
}
