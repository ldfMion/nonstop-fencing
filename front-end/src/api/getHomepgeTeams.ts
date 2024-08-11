import getTop5 from 'helpers/getTop5';
import getUniversitiesfromCsv from 'helpers/getUniversitiesFromCsv';
import {University} from '~/models/University';

export default async function getHomePageFencers(): Promise<{
    mens: University[];
    womens: University[];
}> {
    const universities = await getUniversitiesfromCsv();
    const mens = [...universities].sort((a, b) => b.mens.overall.wins - a.mens.overall.wins);
    const womens = [...universities].sort((a, b) => b.womens.overall.wins - a.womens.overall.wins);
    return {
        mens: getTop5(mens),
        womens: getTop5(womens),
    };
}
