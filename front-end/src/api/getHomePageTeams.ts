import {Gender} from '~/models/Gender';
import {ISeason} from '~/models/Season';
import getTeams from './getTeams';
import {University2} from '~/models/University2';
import {ITeam} from '~/models/Team';
import {HasRecord} from '~/models/HasRecord';

export default async function getHomePageTeams(season: ISeason, gender: Gender): Promise<ITeam[] | (University2 & HasRecord)[]> {
    return getTopFive((await getTeams(season, gender)).filter((team) => team.record.wins > 0 || team.record.losses > 0));
}

function getTopFive(list: ITeam[] | (University2 & HasRecord)[]): ITeam[] | (University2 & HasRecord)[] {
    const top = list.slice(0, 5);
    return top;
}
