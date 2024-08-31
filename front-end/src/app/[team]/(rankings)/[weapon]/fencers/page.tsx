import parseTeam from 'helpers/parseTeam';
import parseWeapon from 'helpers/parseWeapon';
import toTitleCase from 'helpers/toTitleCase';
import {getFencersFromTeamAndWeapon} from '~/api';
import SingleRankingWrapper from '~/app/[team]/(rankings)/single-ranking-wrapper';
import FilteredFencerTableByRegion from '~/components/filtered-fencer-table-by-region';

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
        <SingleRankingWrapper title={title}>
            <FilteredFencerTableByRegion fencers={fencers.map((fencer) => fencer.toObject!())} />
        </SingleRankingWrapper>
    );
}
