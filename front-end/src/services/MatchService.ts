import {Gender} from '~/models/Gender';
import {Match2} from '~/models/Match2';
import {ISeason} from '~/models/Season';
import {University2} from '~/models/University2';
import {MatchRepository} from '~/repositories/MatchRepository';

export class MatchService {
    constructor(private matchRepository: MatchRepository) {}
    async getFromSeason(season: ISeason): Promise<Match2[]> {
        return await this.matchRepository.findAll();
    }
    async get({season, gender, university}: {season?: ISeason; gender?: Gender; university?: University2}): Promise<Match2[]> {
        let matches = await this.matchRepository.findAll();
        if (gender !== undefined) {
            matches = matches.filter((match) => match.gender === gender);
        }
        console.log('gender filtered');
        if (season) {
            matches = matches.filter((match) => match.seasonId === season.id);
        }
        if (university) {
            matches = matches.filter((match) => match.includes(university));
        }
        return matches;
    }
    async getById(id: string): Promise<Match2> {
        return await this.matchRepository.findById(id);
    }
    async fromMeet(meetId: string): Promise<Match2[]> {
        return await this.matchRepository.findByMeetId(meetId);
    }
}
