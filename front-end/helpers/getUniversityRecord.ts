import {Team} from '~/models/FencerSummary';
import getMatchesFromCsv from './getMatchesFromCsv';

export default async function getUniversityRecord(
    universityId: string,
    team: Team,
): Promise<{wins: number; losses: number}> {
    const matches = await getMatchesFromCsv(team);
    const participatingMatches = matches.filter((match) => match.hasTeam(universityId));
    const wins = participatingMatches.filter((match) => match.winner === universityId);
    const winNumber = wins.length;
    const lossesNumber = participatingMatches.length - winNumber;
    return {
        wins: winNumber,
        losses: lossesNumber,
    };
}
