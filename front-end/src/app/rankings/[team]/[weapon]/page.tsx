import parseTeam from 'helpers/parseTeam';
import parseWeapon from 'helpers/parseWeapon';
import {getFencersFromTeamAndWeapon} from '~/api';
import FencerTable from '~/components/fencer-table';
import StandingsCard from '~/components/standings-card';

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
            <div className="flex w-[500px] max-w-[100%] flex-col items-stretch gap-4">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <StandingsCard>
                    <FencerTable fencers={fencers} />
                </StandingsCard>
            </div>
        </main>
    );
}

function toTitleCase(str: string) {
    const words: string[] = str.toLowerCase().split(' ');
    let finalStr = '';
    words.forEach((word) => {
        finalStr += ' ' + word.charAt(0).toUpperCase() + word.slice(1);
    });
    return finalStr;
}
