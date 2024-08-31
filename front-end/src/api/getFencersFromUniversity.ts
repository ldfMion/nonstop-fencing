import type {Team} from '~/models/FencerSummary';
import getRecordsfromCsv from '../../helpers/getRecordsFromCsv';

export default async function getFencersFromUniversity(universityId: string, team: Team) {
    const data = await getRecordsfromCsv();
    return data
        .filter((fencer) => fencer.universityId === universityId && fencer.team === team)
        .sort((a, b) => b.rating - a.rating);
}
