import Match from '~/models/Match';
import parseCSV from './parseCsv';
import {Team} from '~/models/FencerSummary';

let matches: Match[] | null = null;

export default async function getMatchesFromCsv(team: Team): Promise<Match[]> {
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
        anyRow['Team A Overall'],
        anyRow['Team A Foil'],
        anyRow['Team A Epee'],
        anyRow['Team A Saber'],
        anyRow['Team B'],
        anyRow['Team B Overall'],
        anyRow['Team B Foil'],
        anyRow['Team B Epee'],
        anyRow['Team B Saber'],
        new Date(anyRow['Date']),
        anyRow['Host'],
    );
}
