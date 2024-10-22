import assert from 'assert';
import getUniversitiesFromCsv from '~/helpers/getUniversitiesFromCsv';
import {ISeason} from '~/models/Season';
import type {University} from '~/models/University';

export default async function getUniversity(universityId: string): Promise<University> {
    const data = await getUniversitiesFromCsv();
    const found = data.find((university) => university.id === universityId);
    assert(found != undefined, `University ${universityId} not found`);
    return found;
}
