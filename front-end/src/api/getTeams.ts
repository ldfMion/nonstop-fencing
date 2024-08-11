import getUniversitiesfromCsv from 'helpers/getUniversitiesFromCsv';
import {Team} from '~/models/FencerSummary';
import {ITeam} from '~/models/Team';

export default async function getTeams(team: Team): Promise<ITeam[]> {
    const universities = await getUniversitiesfromCsv();
    const teamField = team == Team.MEN ? 'mens' : 'womens';
    const teams = universities.map((university) => {
        return university[teamField];
    });
    teams.sort((a, b) => b.rating - a.rating);
    return teams;
}
