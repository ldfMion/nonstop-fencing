import getFencersFromUniversity from '~/api/getFencersFromUniversity';
import getMatchesFromUniversity from '~/api/getMatchesFromUniversity';
import getUniversity from '~/api/getUniversity';
import FencerTable from '~/components/fencer-table';
import MatchRow from '~/components/match-row';
import StandingsCard from '~/components/standings-card';
import TeamIcon from '~/components/team-icon';
import {Card} from '~/components/ui/card';
import {Team} from '~/models/FencerSummary';

export default async function TeamAndWeaponPage({params}: {params: {university: string}}) {
    const university = await getUniversity(params.university);
    if (!university) {
        return <p>University not found</p>;
    }
    const teamIcon = `/team-icons/${university.id}.png`;
    const fencers = await getFencersFromUniversity(university.id, Team.MEN);
    const matches = await getMatchesFromUniversity(university.id, Team.MEN);
    return (
        <main className="flex flex-col items-stretch gap-5 p-10">
            <Card className="flex flex-row gap-6 p-6">
                <TeamIcon universityId={university.id} size={128} />
                <div>
                    <h2 className="text-4xl font-extrabold">{university.displayNameLong}</h2>
                    <p className="text-lg font-bold">{university?.region}</p>
                </div>
            </Card>
            <div className="flex flex-row items-start gap-5">
                <StandingsCard title="Fencers" className="grow">
                    <FencerTable fencers={fencers} />
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
        </main>
    );
}
