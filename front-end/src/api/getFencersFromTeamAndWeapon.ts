import {Team, Weapon} from '~/models/FencerSummary';
import getValuesfromCsv from '../../helpers/getValuesFromCsv';

export default async function getFencersFromTeamAndWeapon(team: Team, weapon: Weapon) {
    const data = await getValuesfromCsv();
    return data.filter((fencer) => fencer.weapon === weapon && fencer.team === team);
}
