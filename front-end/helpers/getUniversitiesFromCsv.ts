import parseCSV from './parseCsv';
import {University, University1} from '~/models/University';

export default async function getRecordsfromCsv(): Promise<University[]> {
    const data = await parseCSV('../data/universities.csv', parseRow);
    return data;
}

function parseRow(row: unknown): University {
    const anyRow = row as any;
    return new University1(
        anyRow['id'],
        anyRow['Display Name Short'],
        anyRow['Display Name Long'],
        anyRow['Region'],
    );
}
