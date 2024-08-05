import FencerSummary, {FencerSummary1, Team, Weapon} from '~/models/FencerSummary';
import parseWeapon from 'helpers/parseWeapon';
import parseTeam from 'helpers/parseTeam';
import calculatePythagoreanWins from './calculatePythagoreanWins';
import parseCSV from './parseCsv';

let records: FencerSummary[] | null = null;

export default async function getRecordsfromCsv(): Promise<FencerSummary[]> {
    if (records == null) {
        records = (await parseCSV('../data/records.csv', parseRow)).sort(
            (a, b) => b.rating - a.rating,
        );
    }
    return records;
}

function parseRow(row: unknown): FencerSummary {
    const anyRow = row as any;
    return new FencerSummary1(
        anyRow['First name'] === '' ? undefined : anyRow['First name'],
        anyRow['Last name'],
        (anyRow['University '] as string).toLowerCase().replace(' ', ''),
        parseWeapon(anyRow['Weapon']),
        parseTeam(anyRow['Team']),
        parseInt(anyRow['Wins']),
        parseInt(anyRow['Losses']),
        calculatePythagoreanWins,
    );
}
