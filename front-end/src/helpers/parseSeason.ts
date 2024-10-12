import {ISeason, Season} from '~/models/Season';

export function parseSeason(seasonStr: string): ISeason {
    let season;
    if (seasonStr == '23-24') {
        season = new Season(2024);
    } else if (seasonStr == '24-25') {
        season = new Season(2025);
    } else {
        throw new Error(`Invalid season ${seasonStr}`);
    }
    return season;
}
