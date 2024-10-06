import Match from '~/models/Match';
import parseCSV from './parseCsv';
import {Gender} from '~/models/Gender';

let mensMatchesPromise: Promise<Match[]> | null = null;
let womensMatchesPromise: Promise<Match[]> | null = null;

console.log('loaded the get matches from csv file');

export default async function getMatchesFromCsv(gender: Gender): Promise<Match[]> {
    //console.log('getting matches from csv for team: ' + team);
    let matchesPromise = gender === Gender.MEN ? mensMatchesPromise : womensMatchesPromise;
    if (matchesPromise === null) {
        console.log('initiating CSV parsing for', gender === Gender.MEN ? 'men' : 'women');
        matchesPromise = parseCSV(`../data/team-results-${gender === Gender.MEN ? 'men' : 'women'}.csv`, parseRow);
        if (gender === Gender.MEN) {
            mensMatchesPromise = matchesPromise;
        } else {
            womensMatchesPromise = matchesPromise;
        }
    } else {
        //console.log('using existing promise for', team === Gender.MEN ? 'men' : 'women');
    }

    const matches = await matchesPromise;
    return matches;
}

function parseRow(row: unknown): Match {
    const anyRow = row as any;

    return new Match(
        anyRow['Team A'],
        parseInt(anyRow['Team A Overall']),
        parseInt(anyRow['Team A Foil']),
        parseInt(anyRow['Team A Epee']),
        parseInt(anyRow['Team A Saber']),
        anyRow['Team B'],
        parseInt(anyRow['Team B Overall']),
        parseInt(anyRow['Team B Foil']),
        parseInt(anyRow['Team B Epee']),
        parseInt(anyRow['Team B Saber']),
        new Date(anyRow['Date']),
        anyRow['Host'],
    );
}
