import type {Gender} from '~/models/Gender';
import type {Weapon} from '~/models/Weapon';
import type {ISeason} from '~/models/Season';
import {matchService, recordService, universityService} from '~/services';
import type {HasRecord} from '~/models/HasRecord';
import type {University2} from '~/models/University2';

export default async function getSquadsFromTeamAndWeapon(season: ISeason, gender: Gender, weapon: Weapon): Promise<(University2 & HasRecord)[]> {
    const universities = await universityService.get();
    const matches = await matchService.get({season: season, gender: gender});
    const squads = recordService
        .calculateSquadRecords(universities, matches, weapon)
        .sort((a, b) => b.rating - a.rating)
        .filter((squad) => squad.record.wins > 0 || squad.record.losses > 0);
    return squads;
}
