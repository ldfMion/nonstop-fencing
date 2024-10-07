import getTopFive from '~/helpers/getTop5';
import getTeams from './getTeams';
import type {Squad} from '~/models/Squad';
import type {ITeam} from '~/models/Team';
import getSquadsFromTeams from '~/helpers/getSquadsFromTeams';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';
import {ISeason, Season} from '~/models/Season';
import {matchRepository, universityRepository} from '~/repositories';
import {recordService} from '~/services';
import {University2} from '~/models/University2';
import {WithRecord} from '~/models/WithRecord';
import {Match2} from '~/models/Match2';

export default async function getHomePageSquads(season: ISeason): Promise<{
    mens: {
        foil: Squad[] | WithRecord<University2>[];
        epee: Squad[] | WithRecord<University2>[];
        saber: Squad[] | WithRecord<University2>[];
    };
    womens: {
        foil: Squad[] | WithRecord<University2>[];
        epee: Squad[] | WithRecord<University2>[];
        saber: Squad[] | WithRecord<University2>[];
    };
}> {
    if (season.displayNameShort == new Season(2025).displayNameShort) {
        console.log('2025 season');
        const universities = await universityRepository.findAll();
        const matches = await matchRepository.findAll();
        return {
            mens: {
                foil: getTopFive(getSquadRecords(Gender.MEN, Weapon.FOIL, universities, matches)),
                epee: getTopFive(getSquadRecords(Gender.MEN, Weapon.EPEE, universities, matches)),
                saber: getTopFive(getSquadRecords(Gender.MEN, Weapon.SABER, universities, matches)),
            },
            womens: {
                foil: getTopFive(getSquadRecords(Gender.WOMEN, Weapon.FOIL, universities, matches)),
                epee: getTopFive(getSquadRecords(Gender.WOMEN, Weapon.EPEE, universities, matches)),
                saber: getTopFive(getSquadRecords(Gender.WOMEN, Weapon.SABER, universities, matches)),
            },
        };
    }
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

function getSquadRecords(gender: Gender, weapon: Weapon, universities: University2[], matches: Match2[]): WithRecord<University2>[] {
    console.log(matches);
    return recordService
        .calculateSquadRecords(
            universities,
            matches.filter((match) => match.gender === gender),
            weapon,
        )
        .sort((a, b) => b.rating - a.rating)
        .filter((squad) => squad.record.wins > 0 || squad.record.losses > 0);
}
