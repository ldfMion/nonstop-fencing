import parseTeam from 'helpers/parseTeam';
import Link from 'next/link';
import getFencersFromUniversity from '~/api/getFencersFromUniversity';
import getMatchesFromUniversity from '~/api/getMatchesFromUniversity';
import getUniversity from '~/api/getUniversity';
import FencerTable from '~/components/fencer-table';
import FilteredFencerTable from '~/components/filtered-fencer-table';
import MatchRow from '~/components/match-row';
import StandingsCard from '~/components/standings-card';
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
    return (
        <>
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
            <div className="flex flex-row items-start gap-5">
                <StandingsCard title="Fencers" className="grow">
                    <FilteredFencerTable
                        className="justify-start px-4"
                        fencers={fencers.map((fencer) => fencer.toObject!())}
                    />
                </StandingsCard>
                <StandingsCard title="Results" className="grow">
                    {matches.map((match) => (
                        <MatchRow
                            match={match}
                            key={match.teamAId + match.teamBId + match.date}
                            perspective={university}
                        />
                    ))}
                </StandingsCard>
            </div>
        </>
    );
}
