import parseTeam from '~/helpers/parseTeam';
import parseWeapon from '~/helpers/parseWeapon';
import toTitleCase from '~/helpers/toTitleCase';
import type {Metadata} from 'next';
import SingleRankingWrapper from '~/app/[season]/[team]/(rankings)/single-ranking-wrapper';
import FilteredFencerTableByRegion from '~/components/filtered-fencer-table-by-region';
import {parseSeason} from '~/helpers/parseSeason';
import {mapFencerWithRecordAndRegionToObject} from '~/helpers/objectMappers';
import {fencerService} from '~/services';

type Props = {
    params: {team: string; weapon: string; season: string};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const teamWeapon = `${params.team} ${params.weapon}`.replace('ns', "n's");
    const title = toTitleCase(teamWeapon);
    const description = `Check out top NCAA ${teamWeapon} fencers`;
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
        },
    };
}

export default async function Fencers({params}: Props) {
    const season = parseSeason(params.season);
    const gender = parseTeam(params.team);
    const weapon = parseWeapon(params.weapon);
    // const fencers = await getFencersFromTeamAndWeapon(season, team, weapon);
    const fencers = await fencerService.getRegionsForFencers(
        await fencerService.getSeasonRecords(await fencerService.getFromGenderAndWeapon(season, gender, weapon), season),
    );
    const title = toTitleCase(`${params.team} ${params.weapon}`).replace('ns', "n's");
    return (
        <SingleRankingWrapper title={title} season={season}>
            <FilteredFencerTableByRegion fencers={mapFencerWithRecordAndRegionToObject(fencers)} />
        </SingleRankingWrapper>
    );
}
