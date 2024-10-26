import type {Gender} from '~/models/Gender';
import type {Match2} from '~/models/Match2';
import type {ISeason} from '~/models/Season';
import type {University2} from '~/models/University2';
import {matchRepository} from '~/repositories';

export class MatchService {
    async getFromSeason(season: ISeason): Promise<Match2[]> {
        return (await matchRepository.findAll()).filter((match) => match.seasonId === season.id);
    }
    async get({season, gender, university}: {season?: ISeason; gender?: Gender; university?: University2}): Promise<Match2[]> {
        let matches = await matchRepository.findAll();
        if (gender !== undefined) {
            matches = matches.filter((match) => match.gender === gender);
        }
        if (season) {
            matches = matches.filter((match) => match.seasonId === season.id);
        }
        if (university) {
            matches = matches.filter((match) => match.includes(university));
        }
        return matches;
    }
    async getById(id: string): Promise<Match2> {
        return await matchRepository.findById(id);
    }
    async fromMeet(meetId: string): Promise<Match2[]> {
        return await matchRepository.findByMeetId(meetId);
    }
}
