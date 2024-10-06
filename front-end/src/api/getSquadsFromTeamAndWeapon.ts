import {Gender} from '~/models/Gender';
import getTeams from './getTeams';
import getSquadsFromTeams from '~/helpers/getSquadsFromTeams';
import {Weapon} from '~/models/Weapon';

export default async function getSquadsFromTeamAndWeapon(gender: Gender, weapon: Weapon) {
    const teams = await getTeams(gender);
    const squads = getSquadsFromTeams(teams, weapon);
    squads.sort((a, b) => b.rating - a.rating);
    return squads;
}
