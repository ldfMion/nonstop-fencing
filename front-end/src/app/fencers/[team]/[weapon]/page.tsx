import parseTeam from 'helpers/parseTeam';
import parseWeapon from 'helpers/parseWeapon';
import toTitleCase from 'helpers/toTitleCase';
import {getFencersFromTeamAndWeapon} from '~/api';
import FilteredFencerTableByRegion from '~/components/filtered-fencer-table-by-region';
import StandingsCard from '~/components/list-card';

export default async function TeamAndWeaponPage({
    params,
}: {
    params: {team: string; weapon: string};
}) {
    const team = parseTeam(params.team);
    const weapon = parseWeapon(params.weapon);
    const fencers = await getFencersFromTeamAndWeapon(team, weapon);
    const title = toTitleCase(`${params.team} ${params.weapon}`).replace('ns', "n's");
    return (
        <main className="flex flex-col items-center p-6">
            <div className="flex w-[600px] max-w-[100%] flex-col items-stretch gap-4">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <StandingsCard>
                    <FilteredFencerTableByRegion
                        fencers={fencers.map((fencer) => fencer.toObject!())}
                    />
                </StandingsCard>
            </div>
        </main>
    );
}
