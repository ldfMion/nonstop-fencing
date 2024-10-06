import getRecordsfromCsv from '~/helpers/getRecordsFromCsv';
import type FencerSummary from '~/models/FencerSummary';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';

export default async function getFencersFromGenderAndWeapon(gender: Gender, weapon: Weapon): Promise<FencerSummary[]> {
    const data = await getRecordsfromCsv();
    const filtered = data.filter((fencer) => fencer.weapon === weapon && fencer.team === gender);
    filtered.sort((a, b) => b.rating - a.rating);
    return filtered;
}
