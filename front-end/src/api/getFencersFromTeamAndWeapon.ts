import getRecordsfromCsv from '~/helpers/getRecordsFromCsv';
import {Fencer} from '~/models/Fencer';
import type FencerSummary from '~/models/FencerSummary';
import {Gender} from '~/models/Gender';
import {ISeason, Season} from '~/models/Season';
import {Weapon} from '~/models/Weapon';
import {HasRecord} from '~/models/HasRecord';
import {boutService, fencerService, recordService} from '~/services';
import {HasRegion} from '~/models/HasRegion';

export default async function getFencersFromGenderAndWeapon(
    season: ISeason,
    gender: Gender,
    weapon: Weapon,
): Promise<(Fencer & HasRecord & HasRegion)[]> {
    let data;
    if (season.displayNameShort == new Season(2025).displayNameShort) {
        const fencers = await fencerService.getFromGenderAndWeapon(season, gender, weapon);
        const fencersWithRegions = await fencerService.getRegionsForFencers(fencers);
        const fencersWithRegionAndRecord = recordService.calculateRecordsFromBouts(
            fencersWithRegions,
            await boutService.get({fencers: fencersWithRegions}),
        );
        data = fencersWithRegionAndRecord;
    } else if (season.displayNameShort == new Season(2024).displayNameShort) {
        const fencers = await getRecordsfromCsv();
        const filtered = fencers.filter((fencer) => fencer.weapon === weapon && fencer.gender === gender);
        data = filtered;
    } else {
        throw new Error(`Unknown season: ${season.displayNameLong}`);
    }
    data.sort((a, b) => b.rating - a.rating);
    return data;
}
