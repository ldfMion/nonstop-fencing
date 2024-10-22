import type {Squad} from '~/models/Squad';
import getSquadsFromTeams from '~/helpers/getSquadsFromTeams';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';
import {ISeason} from '~/models/Season';
import {recordService} from '~/services';
import {University2} from '~/models/University2';
import {Match2} from '~/models/Match2';
import {HasRecord} from '~/models/HasRecord';
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

function getSquadRecords(gender: Gender, weapon: Weapon, universities: University2[], matches: Match2[]): (University2 & HasRecord)[] {
    return recordService
        .calculateSquadRecords(
            universities,
            matches.filter((match) => match.gender === gender),
            weapon,
        )
        .sort((a, b) => b.rating - a.rating)
        .filter((squad) => squad.record.wins > 0 || squad.record.losses > 0);
}

function getTopFive(list: Squad[] | (University2 & HasRecord)[]): Squad[] | (University2 & HasRecord)[] {
    const top = list.slice(0, 5);
    return top;
}
