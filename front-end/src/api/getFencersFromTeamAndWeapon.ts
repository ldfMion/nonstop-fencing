import {Team, Weapon} from '~/models/FencerSummary';
import getRecordsfromCsv from '../../helpers/getRecordsFromCsv';

export default async function getFencersFromTeamAndWeapon(team: Team, weapon: Weapon) {
    const data = await getRecordsfromCsv();
    return data.filter((fencer) => fencer.weapon === weapon && fencer.team === team);
}
