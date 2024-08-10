import getMatchesFromCsv from 'helpers/getMatchesFromCsv';
import getTop5 from 'helpers/getTop5';
import getUniversitiesfromCsv from 'helpers/getUniversitiesFromCsv';
import getUniversityRecord from 'helpers/getUniversityRecord';
import {Team} from '~/models/FencerSummary';
import {UniversityWithRecord} from '~/models/University';

export default async function getHomePageFencers(): Promise<{
    mens: UniversityWithRecord[];
    womens: UniversityWithRecord[];
}> {
    const universities = await getUniversitiesfromCsv();
    const mensWithRecords = await Promise.all(
        universities.map(async (university) => {
            const record = await getUniversityRecord(university.id, Team.MEN);
            return {
                ...university,
                record: record,
            };
        }),
    );
    mensWithRecords.sort((a, b) => b.record.wins - a.record.wins);
    const womensWithRecords = await Promise.all(
        universities.map(async (university) => {
            const record = await getUniversityRecord(university.id, Team.WOMEN);
            return {
                ...university,
                record: record,
            };
        }),
    );
    womensWithRecords.sort((a, b) => b.record.wins - a.record.wins);
    return {
        mens: getTop5(mensWithRecords),
        womens: getTop5(womensWithRecords),
    };
}
