import {Gender} from '~/models/Gender';
import {Match2} from '~/models/Match2';
import {ISeason} from '~/models/Season';
import {Weapon} from '~/models/Weapon';
import {MatchRepository} from '~/repositories/MatchRepository';

export class MatchService {
    constructor(private matchRepository: MatchRepository) {}
    async getFromSeason(season: ISeason): Promise<Match2[]> {
        return await this.matchRepository.findAll();
    }
    async get({season, gender}: {season?: ISeason; gender?: Gender}): Promise<Match2[]> {
        let matches = await this.matchRepository.findAll();
        console.log(matches);
        if (gender !== undefined) {
            matches = matches.filter((match) => match.gender === gender);
        }
        console.log('gender filtered');
        console.log(matches);
        if (season) {
            matches = matches.filter((match) => match.seasonId === season.id);
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
