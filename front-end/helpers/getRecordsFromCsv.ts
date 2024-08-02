import FencerSummary, {FencerSummary1, Team, Weapon} from '~/models/FencerSummary';
import parseWeapon from 'helpers/parseWeapon';
import parseTeam from 'helpers/parseTeam';
import calculatePythagoreanWins from './calculatePythagoreanWins';
import parseCSV from './parseCsv';

export default async function getRecordsfromCsv(): Promise<FencerSummary[]> {
    return (await parseCSV('../data/records.csv', parseRow)).sort((a, b) => b.rating - a.rating);
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
