import getUniversitiesfromCsv from 'helpers/getUniversitiesFromCsv';
import {Team} from '~/models/FencerSummary';
import {University} from '~/models/University';

export default async function getTeams(team: Team): Promise<University[]> {
    const universities = await getUniversitiesfromCsv();
    const teamField = team == Team.MEN ? 'mens' : 'womens';
    universities.sort((a, b) => b[teamField].overall.wins - a[teamField].overall.wins);
    return universities;
}
