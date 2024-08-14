import {Team, Weapon} from '~/models/FencerSummary';
import getTopFive from 'helpers/getTop5';
import getTeams from './getTeams';
import {Squad} from '~/models/Squad';
import {University} from '~/models/University';
import Record from '~/models/Record';
import {ITeam} from '~/models/Team';
import calculatePythagoreanWins from 'helpers/calculatePythagoreanWins';
import getSquadsFromTeams from 'helpers/getSquadsFromTeams';

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
    const mensTeams = await getTeams(Team.MEN);
    const womensTeams = await getTeams(Team.WOMEN);
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
