import getMatchesFromCsv from '~/helpers/getMatchesFromCsv';
import {Gender} from '~/models/Gender';
import type Match from '~/models/Match';

export default async function getMatchesFromUniversity(id: string, gender: Gender): Promise<Match[]> {
    const data = await getMatchesFromCsv(gender);
    return data.filter((match) => match.hasTeam(id)).sort((a, b) => b.date.getTime() - a.date.getTime());
}
