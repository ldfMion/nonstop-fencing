import {Bout} from '~/models/Bout';
import {Fencer} from '~/models/Fencer';
import {ISeason} from '~/models/Season';
import {BoutRepository} from '~/repositories/BoutRepository';
import {FencerRepository} from '~/repositories/FencerRepository';
import {MatchRepository} from '~/repositories/MatchRepository';

export class BoutService {
    constructor(
        private fencerRepository: FencerRepository,
        private matchRepository: MatchRepository,
        private boutRepository: BoutRepository,
    ) {}
    async getFromMeet(meetId: string): Promise<Bout[]> {
        const matchesFromEvent = await this.matchRepository.findByMeetId(meetId);
        const boutsFromMatches = (await Promise.all(matchesFromEvent.map((match) => this.boutRepository.findByMatchId(match.id)))).flat();
        return boutsFromMatches;
    }
    async getFromSeason(season: ISeason): Promise<Bout[]> {
        return await this.boutRepository.findAll();
    }
    async getBoutsFromFencers(fencers: Fencer[]): Promise<Bout[]> {
        const bouts = await this.boutRepository.findAll();
        return bouts.filter((bout) => fencers.some((fencer) => bout.fencerAId === fencer.id || bout.fencerBId === fencer.id));
    }
    async get({season, fencers}: {season?: ISeason; fencers?: Fencer[]}): Promise<Bout[]> {
        let bouts = await this.boutRepository.findAll();
        if (season) {
            bouts = await Promise.all(
                bouts.filter(async (bout) => {
                    const match = await this.matchRepository.findById(bout.matchId);
                    return match.seasonId === season.id;
                }),
            );
        }
        if (fencers) {
            bouts = bouts.filter((bout) => fencers.some((fencer) => bout.fencerAId === fencer.id || bout.fencerBId === fencer.id));
        }
        return bouts;
    }
    async getFromMatch(matchId: string): Promise<Bout[]> {
        return await this.boutRepository.findByMatchId(matchId);
    }
}
