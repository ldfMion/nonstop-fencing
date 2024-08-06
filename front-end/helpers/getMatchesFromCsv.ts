import Match from '~/models/Match';
import parseCSV from './parseCsv';
import {Team} from '~/models/FencerSummary';

let mensMatches: Match[] | null = null;
let womensMathces: Match[] | null = null;

export default async function getMatchesFromCsv(team: Team): Promise<Match[]> {
    let matches = team == Team.MEN ? mensMatches : womensMathces;
    if (matches == null) {
        matches = await parseCSV(
            `../data/team-results-${team === Team.MEN ? 'men' : 'women'}.csv`,
            parseRow,
        );
        matches.sort((a, b) => a.date.getTime() - b.date.getTime());
    }
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
