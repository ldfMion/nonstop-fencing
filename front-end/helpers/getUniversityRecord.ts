import Record from '~/models/Record';
import {Team} from '~/models/FencerSummary';
import getMatchesFromCsv from './getMatchesFromCsv';
import Match from '~/models/Match';

export default async function getUniversityRecord(
    universityId: string,
    team: Team,
): Promise<{overall: Record; foil: Record; epee: Record; saber: Record}> {
    const matches = await getMatchesFromCsv(team);
    const participatingMatches = matches.filter((match) => match.hasTeam(universityId));
    const record = {
        overall: {
            wins: 0,
            losses: 0,
        },
        foil: {
            wins: 0,
            losses: 0,
        },
        epee: {
            wins: 0,
            losses: 0,
        },
        saber: {
            wins: 0,
            losses: 0,
        },
    };
    for (const match of participatingMatches) {
        incrementRecord(match.winner, universityId, record.overall);
        incrementRecord(match.foilWinner, universityId, record.foil);
        incrementRecord(match.epeeWinner, universityId, record.epee);
        incrementRecord(match.saberWinner, universityId, record.saber);
    }
    return record;
}

function incrementRecord(winner: string | null, universityId: string, record: Record) {
    if (winner == null) {
        return;
    }
    if (winner === universityId) {
        record.wins++;
        return;
    }
    record.losses++;
}
