import type {Gender} from '~/models/Gender';
import type {ISeason} from '~/models/Season';
import getTeams from './getTeams';
import type {University2} from '~/models/University2';
import type {HasRecord} from '~/models/HasRecord';

export default async function getHomePageTeams(season: ISeason, gender: Gender): Promise<(University2 & HasRecord)[]> {
    return getTopFive((await getTeams(season, gender)).filter((team) => team.record.wins > 0 || team.record.losses > 0));
}

function getTopFive(list: (University2 & HasRecord)[]): (University2 & HasRecord)[] {
    const top = list.slice(0, 5);
    return top;
}
