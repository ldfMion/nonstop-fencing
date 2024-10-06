import getUniversitiesfromCsv from '~/helpers/getUniversitiesFromCsv';
import {Gender} from '~/models/Gender';
import type {ITeam} from '~/models/Team';

export default async function getTeams(gender: Gender): Promise<ITeam[]> {
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

function teamExists(team: ITeam) {
    return team.overall.losses + team.overall.wins !== 0;
}
