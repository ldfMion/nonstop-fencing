import getTopFive from '~/helpers/getTop5';
import {Gender} from '~/models/Gender';
import {ISeason, Season} from '~/models/Season';
import getTeams from './getTeams';
import {recordService} from '~/services';
import {matchRepository, universityRepository} from '~/repositories';
import {University2} from '~/models/University2';
import {WithRecord} from '~/models/WithRecord';
import {ITeam} from '~/models/Team';

export default async function getHomePageTeams(season: ISeason, gender: Gender): Promise<ITeam[] | WithRecord<University2>[]> {
    if (season.displayNameShort == new Season(2025).displayNameShort) {
        const universities = await universityRepository.findAll();
        const matches = (await matchRepository.findAll()).filter((match) => match.gender === gender);
        const teamsWithRecords = recordService
            .calculateRecordsFromMatches(universities, matches)
            .filter((team) => team.record.wins > 0 || team.record.losses > 0)
            .sort((a, b) => b.rating - a.rating);
        return getTopFive(teamsWithRecords);
    }
    if (season.displayNameShort == new Season(2024).displayNameShort) {
        return getTopFive(await getTeams(gender));
    }
    throw new Error(`Invalid season: ${season.displayNameShort}`);
}
