import getFencersFromUniversity from '~/api/getFencersFromUniversity';
import getMatchesFromUniversity from '~/api/getMatchesFromUniversity';
import getUniversity from '~/api/getUniversity';
import FencerTable from '~/components/fencer-table';
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
        <main className="flex flex-col gap-5 p-10">
            <Card className="flex flex-row gap-6 p-6">
                <TeamIcon src={teamIcon} alt={university.displayNameShort + ' Icon'} size={128} />
                <div>
                    <h2 className="text-4xl font-extrabold">{university.displayNameLong}</h2>
                    <p className="text-lg font-bold">{university?.region}</p>
                </div>
            </Card>
            <StandingsCard title="Fencers">
                <FencerTable fencers={fencers} />
            </StandingsCard>
            {matches.map((match) => JSON.stringify(match))}
        </main>
    );
}
