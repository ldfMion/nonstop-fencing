import calculatePythagoreanWins from './calculatePythagoreanWins';
import parseCSV from './parseCsv';
import {University, University1} from '~/models/University';

let universities: University[] | null = null;

export default async function getUniversitiesfromCsv(): Promise<University[]> {
    if (universities == null) {
        universities = await parseCSV('../data/universities.csv', parseRow);
    }
    return universities;
}

function parseRow(row: unknown): University {
    const anyRow = row as any;
    return new University1(
        anyRow['id'],
        anyRow['Display Name Short'],
        anyRow['Display Name Long'],
        anyRow['Region'],
        anyRow['Theme Color'],
    );
}
