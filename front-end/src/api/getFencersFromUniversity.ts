import getRecordsfromCsv from '~/helpers/getRecordsFromCsv';
import {Gender} from '~/models/Gender';

export default async function getFencersFromUniversity(universityId: string, gender: Gender) {
    const data = await getRecordsfromCsv();
    return data.filter((fencer) => fencer.universityId === universityId && fencer.gender === gender).sort((a, b) => b.rating - a.rating);
}
