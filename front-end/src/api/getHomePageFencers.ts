import getTopFive from '~/helpers/getTop5';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';
import type {ISeason} from '~/models/Season';
import {fencerService} from '~/services';
import type {Fencer} from '~/models/Fencer';
import type {HasRecord} from '~/models/HasRecord';

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
