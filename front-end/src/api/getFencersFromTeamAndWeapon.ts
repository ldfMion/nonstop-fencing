import type {Team, Weapon} from '~/models/FencerSummary';
import getRecordsfromCsv from '~/helpers/getRecordsFromCsv';
import type FencerSummary from '~/models/FencerSummary';

export default async function getFencersFromTeamAndWeapon(team: Team, weapon: Weapon): Promise<FencerSummary[]> {
    const data = await getRecordsfromCsv();
    const filtered = data.filter((fencer) => fencer.weapon === weapon && fencer.team === team);
    filtered.sort((a, b) => b.rating - a.rating);
    return filtered;
}
