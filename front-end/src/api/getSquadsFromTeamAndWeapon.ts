import {Gender} from '~/models/Gender';
import getTeams from './getTeams';
import getSquadsFromTeams from '~/helpers/getSquadsFromTeams';
import {Weapon} from '~/models/Weapon';
import {ISeason, Season} from '~/models/Season';
import {matchService, recordService, universityService} from '~/services';
import {HasRecord} from '~/models/HasRecord';
import {University2} from '~/models/University2';
import {Squad} from '~/models/Squad';
import {ITeam} from '~/models/Team';

export default async function getSquadsFromTeamAndWeapon(
    season: ISeason,
    gender: Gender,
    weapon: Weapon,
): Promise<Squad[] | (University2 & HasRecord)[]> {
    const universities = await universityService.get();
    const matches = await matchService.get({season: season, gender: gender});
    const squads = recordService
        .calculateSquadRecords(universities, matches, weapon)
        .sort((a, b) => b.rating - a.rating)
        .filter((squad) => squad.record.wins > 0 || squad.record.losses > 0);
    return squads;
}
