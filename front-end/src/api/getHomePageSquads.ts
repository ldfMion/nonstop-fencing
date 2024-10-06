import getTopFive from '~/helpers/getTop5';
import getTeams from './getTeams';
import type {Squad} from '~/models/Squad';
import type {ITeam} from '~/models/Team';
import getSquadsFromTeams from '~/helpers/getSquadsFromTeams';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';

export default async function getHomePageSquads(): Promise<{
    mens: {
        foil: Squad[];
        epee: Squad[];
        saber: Squad[];
    };
    womens: {
        foil: Squad[];
        epee: Squad[];
        saber: Squad[];
    };
}> {
    const mensTeams = await getTeams(Gender.MEN);
    const womensTeams = await getTeams(Gender.WOMEN);
    return {
        mens: {
            foil: getSqudsFromTeamsForHomePage(mensTeams, Weapon.FOIL),
            epee: getSqudsFromTeamsForHomePage(mensTeams, Weapon.EPEE),
            saber: getSqudsFromTeamsForHomePage(mensTeams, Weapon.SABER),
        },
        womens: {
            foil: getSqudsFromTeamsForHomePage(womensTeams, Weapon.FOIL),
            epee: getSqudsFromTeamsForHomePage(womensTeams, Weapon.EPEE),
            saber: getSqudsFromTeamsForHomePage(womensTeams, Weapon.SABER),
        },
    };
}

function getSqudsFromTeamsForHomePage(teams: ITeam[], weapon: Weapon): Squad[] {
    return getTopFive(getSquadsFromTeams(teams, weapon));
}
