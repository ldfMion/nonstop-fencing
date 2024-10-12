import getRecordsFromCsv from '~/helpers/getRecordsFromCsv';
import getTopFive from '~/helpers/getTop5';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';
import {ISeason, Season} from '~/models/Season';
import {boutService, fencerService, recordService} from '~/services';
import {Fencer} from '~/models/Fencer';
import {HasRecord} from '~/models/HasRecord';

export default async function getHomePageFencers(season: ISeason): Promise<{
    mens: {
        foil: (Fencer & HasRecord)[];
        epee: (Fencer & HasRecord)[];
        saber: (Fencer & HasRecord)[];
    };
    womens: {
        foil: (Fencer & HasRecord)[];
        epee: (Fencer & HasRecord)[];
        saber: (Fencer & HasRecord)[];
    };
}> {
    let data;
    if (season.displayNameShort == new Season(2025).displayNameShort) {
        const fencers = await fencerService.get();
        const bouts = await boutService.get({season});
        const withRecords = recordService.calculateRecordsFromBouts(fencers, bouts);
        data = withRecords;
    } else if (season.displayNameShort == new Season(2024).displayNameShort) {
        data = await getRecordsFromCsv();
    } else {
        throw new Error(`Unknown season: ${season.displayNameLong}`);
    }
    data.sort((a, b) => b.rating - a.rating);
    return {
        mens: {
            foil: getTopFive(data.filter((fencer) => fencer.gender === Gender.MEN && fencer.weapon === Weapon.FOIL)),
            epee: getTopFive(data.filter((fencer) => fencer.gender === Gender.MEN && fencer.weapon === Weapon.EPEE)),
            saber: getTopFive(data.filter((fencer) => fencer.gender === Gender.MEN && fencer.weapon === Weapon.SABER)),
        },
        womens: {
            foil: getTopFive(data.filter((fencer) => fencer.gender === Gender.WOMEN && fencer.weapon === Weapon.FOIL)),
            epee: getTopFive(data.filter((fencer) => fencer.gender === Gender.WOMEN && fencer.weapon === Weapon.EPEE)),
            saber: getTopFive(data.filter((fencer) => fencer.gender === Gender.WOMEN && fencer.weapon === Weapon.SABER)),
        },
    };
}
