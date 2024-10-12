import {Gender} from '~/models/Gender';
import getTeams from './getTeams';
import getSquadsFromTeams from '~/helpers/getSquadsFromTeams';
import {Weapon} from '~/models/Weapon';
import {ISeason, Season} from '~/models/Season';
import {universityRepository} from '~/repositories';
import {matchService, recordService} from '~/services';
import {HasRecord} from '~/models/HasRecord';
import {University2} from '~/models/University2';
import {Squad} from '~/models/Squad';
import {ITeam} from '~/models/Team';

export default async function getSquadsFromTeamAndWeapon(
    season: ISeason,
    gender: Gender,
    weapon: Weapon,
): Promise<Squad[] | (University2 & HasRecord)[]> {
    if (season.displayNameShort == new Season(2025).displayNameShort) {
        const universities = await universityRepository.findAll();
        const matches = await matchService.get({season: new Season(2025), gender: gender});
        console.log(matches);
        const squads = recordService
            .calculateSquadRecords(universities, matches, weapon)
            .sort((a, b) => b.rating - a.rating)
            .filter((squad) => squad.record.wins > 0 || squad.record.losses > 0);
        return squads;
    }
    if (season.displayNameShort == new Season(2024).displayNameShort) {
        const teams = (await getTeams(new Season(2024), gender)) as ITeam[];
        const squads = getSquadsFromTeams(teams, weapon);
        squads.sort((a, b) => b.rating - a.rating);
        return squads;
    }
    throw new Error(`Invalid season ${season.displayNameShort}`);
}
