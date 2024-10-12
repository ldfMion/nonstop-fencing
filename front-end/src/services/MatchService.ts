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
        if (gender) {
            matches = matches.filter((match) => match.gender === gender);
        }
        return matches;
    }
}
