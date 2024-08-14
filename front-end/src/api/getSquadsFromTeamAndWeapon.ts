import {Team, Weapon} from '~/models/FencerSummary';
import getRecordsfromCsv from '../../helpers/getRecordsFromCsv';
import getTeams from './getTeams';
import getSquadsFromTeams from 'helpers/getSquadsFromTeams';

export default async function getSquadsFromTeamAndWeapon(team: Team, weapon: Weapon) {
    const teams = await getTeams(team);
    const squads = getSquadsFromTeams(teams, weapon);
    squads.sort((a, b) => b.rating - a.rating);
    return squads;
}
