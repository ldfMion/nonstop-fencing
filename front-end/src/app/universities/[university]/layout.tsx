import getFencersFromUniversity from '~/api/getFencersFromUniversity';
import getMatchesFromUniversity from '~/api/getMatchesFromUniversity';
import getUniversity from '~/api/getUniversity';
import FencerTable from '~/components/fencer-table';
import MatchRow from '~/components/match-row';
import StandingsCard from '~/components/standings-card';
import TeamIcon from '~/components/team-icon';
import {Card} from '~/components/ui/card';
import {Team} from '~/models/FencerSummary';

export default async function University({
    params,
    children,
}: {
    params: {university: string};
    children: React.ReactNode;
}) {
    const university = await getUniversity(params.university);
    if (!university) {
        return <p>University not found</p>;
    }
    return (
        <main className="flex flex-col items-stretch gap-5 p-10">
            <Card className="flex flex-row gap-6 p-6">
                <TeamIcon universityId={university.id} size={128} />
                <div>
                    <h2 className="text-4xl font-extrabold">{university.displayNameLong}</h2>
                    <p className="text-lg font-bold">{university?.region}</p>
                </div>
            </Card>
            {children}
        </main>
    );
}
