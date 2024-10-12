import getUniversitiesfromCsv from '~/helpers/getUniversitiesFromCsv';
import {Gender} from '~/models/Gender';
import {HasRecord} from '~/models/HasRecord';
import {ISeason, Season} from '~/models/Season';
import type {ITeam} from '~/models/Team';
import {University2} from '~/models/University2';
import {matchRepository, universityRepository} from '~/repositories';
import {recordService} from '~/services';

export default async function getTeams(season: ISeason, gender: Gender): Promise<ITeam[] | (University2 & HasRecord)[]> {
    if (season.displayNameShort == new Season(2025).displayNameShort) {
        const universities = await universityRepository.findAll();
        const matches = (await matchRepository.findAll()).filter((match) => match.gender === gender);
        const teamsWithRecords = recordService
            .calculateRecordsFromMatches(universities, matches)
            .filter((team) => team.record.wins > 0 || team.record.losses > 0)
            .sort((a, b) => b.rating - a.rating);
        return teamsWithRecords;
    }
    if (season.displayNameShort == new Season(2024).displayNameShort) {
        const universities = await getUniversitiesfromCsv();
        const teamField = gender == Gender.MEN ? 'mens' : 'womens';
        const teams = universities
            .map((university) => {
                return university[teamField];
            })
            .filter((team) => teamExists(team));
        teams.sort((a, b) => b.rating - a.rating);
        return teams;
    }
    throw new Error(`Invalid season: ${season.displayNameShort}`);
}

function teamExists(team: ITeam) {
    return team.overall.losses + team.overall.wins !== 0;
}
