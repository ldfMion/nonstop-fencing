import type {Squad} from '~/models/Squad';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';
import type {ISeason} from '~/models/Season';
import type {University2} from '~/models/University2';
import type {HasRecord} from '~/models/HasRecord';
import getSquadsFromTeamAndWeapon from './getSquadsFromTeamAndWeapon';

export default async function getHomePageSquads(season: ISeason): Promise<{
    mens: {
        foil: Squad[] | (University2 & HasRecord)[];
        epee: Squad[] | (University2 & HasRecord)[];
        saber: Squad[] | (University2 & HasRecord)[];
    };
    womens: {
        foil: Squad[] | (University2 & HasRecord)[];
        epee: Squad[] | (University2 & HasRecord)[];
        saber: Squad[] | (University2 & HasRecord)[];
    };
}> {
    return {
        mens: {
            foil: getTopFive(await getSquadsFromTeamAndWeapon(season, Gender.MEN, Weapon.FOIL)),
            epee: getTopFive(await getSquadsFromTeamAndWeapon(season, Gender.MEN, Weapon.EPEE)),
            saber: getTopFive(await getSquadsFromTeamAndWeapon(season, Gender.MEN, Weapon.SABER)),
        },
        womens: {
            foil: getTopFive(await getSquadsFromTeamAndWeapon(season, Gender.WOMEN, Weapon.FOIL)),
            epee: getTopFive(await getSquadsFromTeamAndWeapon(season, Gender.WOMEN, Weapon.EPEE)),
            saber: getTopFive(await getSquadsFromTeamAndWeapon(season, Gender.WOMEN, Weapon.SABER)),
        },
    };
}

function getTopFive(list: Squad[] | (University2 & HasRecord)[]): Squad[] | (University2 & HasRecord)[] {
    const top = list.slice(0, 5);
    return top;
}
