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
        console.log(matches.map((m) => m.id));
        if (gender !== undefined) {
            console.log('filtering by gender');
            matches = matches.filter((match) => match.gender === gender);
            console.log(matches.map((m) => m.id));
        }
        if (season) {
            console.log('filtering by season');
            console.log(matches.map((m) => m.id));
            console.log(matches.map((m) => m.seasonId));
            matches = matches.filter((match) => match.seasonId === season.id);
            console.log(matches.map((m) => m.id));
        }
        if (university) {
            matches = matches.filter((match) => match.includes(university));
        }
        console.log('filtered matches');
        console.log(matches);
        return matches;
    }
    async getById(id: string): Promise<Match2> {
        return await this.matchRepository.findById(id);
    }
    async fromMeet(meetId: string): Promise<Match2[]> {
        return await this.matchRepository.findByMeetId(meetId);
    }
}
