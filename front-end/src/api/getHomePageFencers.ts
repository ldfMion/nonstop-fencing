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
    const data = await fencerService.getSeasonRecords(await fencerService.get(season, {}), season);
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
