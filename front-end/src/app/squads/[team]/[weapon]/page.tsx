import parseTeam from 'helpers/parseTeam';
import parseWeapon from 'helpers/parseWeapon';
import toTitleCase from 'helpers/toTitleCase';
import {getFencersFromTeamAndWeapon} from '~/api';
import getSquadsFromTeamAndWeapon from '~/api/getSquadsFromTeamAndWeapon';
import FilteredFencerTableByRegion from '~/components/filtered-fencer-table-by-region';
import StandingsCard from '~/components/list-card';
import RankingRow from '~/components/ranking-row';

export default async function TeamAndWeaponPage({
    params,
}: {
    params: {team: string; weapon: string};
}) {
    const team = parseTeam(params.team);
    const weapon = parseWeapon(params.weapon);
    const squads = await getSquadsFromTeamAndWeapon(team, weapon);
    const title = toTitleCase(`${params.team} ${params.weapon}`).replace('ns', "n's");
    return (
        <main className="flex flex-col items-center p-6">
            <div className="flex w-[600px] max-w-[100%] flex-col items-stretch gap-4">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <StandingsCard>
                    {squads.map((squad) => (
                        <RankingRow
                            name={squad.university.displayNameShort}
                            record={squad.record}
                            iconUniversityId={squad.university.id}
                        />
                    ))}
                </StandingsCard>
            </div>
        </main>
    );
}
