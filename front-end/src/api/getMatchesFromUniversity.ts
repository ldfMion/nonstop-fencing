import getMatchesFromCsv from '~/helpers/getMatchesFromCsv';
import type Match from '~/models/Match';
import type {Team} from '~/models/FencerSummary';

export default async function getMatchesFromUniversity(id: string, team: Team): Promise<Match[]> {
    console.log(id);
    const data = await getMatchesFromCsv(team);
    return data.filter((match) => match.hasTeam(id)).sort((a, b) => b.date.getTime() - a.date.getTime());
}
