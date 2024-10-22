import getUniversitiesfromCsv from '~/helpers/getUniversitiesFromCsv';
import {Gender} from '~/models/Gender';
import {HasRecord} from '~/models/HasRecord';
import {ISeason, Season} from '~/models/Season';
import type {ITeam} from '~/models/Team';
import {University2} from '~/models/University2';
import {matchService, recordService, universityService} from '~/services';

export default async function getTeams(season: ISeason, gender: Gender): Promise<(University2 & HasRecord)[]> {
    const universities = await universityService.get();
    const matches = await matchService.get({season, gender});
    const teamsWithRecords = recordService
        .calculateRecordsFromMatches(universities, matches)
        .filter((team) => team.record.wins > 0 || team.record.losses > 0)
        .sort((a, b) => b.rating - a.rating);
    return teamsWithRecords;
}
