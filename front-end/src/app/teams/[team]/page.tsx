import getUniversitiesfromCsv from 'helpers/getUniversitiesFromCsv';
import parseTeam from 'helpers/parseTeam';
import {getTeams} from '~/api';
import RankingRow from '~/components/ranking-row';
import StandingsCard from '~/components/list-card';
import toTitleCase from 'helpers/toTitleCase';

export default async function TeamRankingPage({params}: {params: {team: string}}) {
    const team = parseTeam(params.team);
    const teams = await getTeams(team);
    const title = toTitleCase(`${params.team}`).replace('ns', "n's") + ' Teams';
    return (
        <main className="flex flex-col items-center p-6">
            <div className="flex w-[500px] max-w-[100%] flex-col items-stretch gap-4">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <StandingsCard>
                    {teams.map((team) => (
                        <RankingRow
                            key={team.university.id}
                            name={team.university.displayNameShort}
                            iconUniversityId={team.university.id}
                            record={team.overall}
                        />
                    ))}
                </StandingsCard>
            </div>
        </main>
    );
}
