import getUniversitiesFromCsv from 'helpers/getUniversitiesFromCsv';
import {University} from '~/models/University';

export default async function getFencersFromTeamAndWeapon(
    universityId: string,
): Promise<University | undefined> {
    const data = await getUniversitiesFromCsv();
    return data.find((university) => university.id === universityId);
}
