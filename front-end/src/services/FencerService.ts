import {Bout} from '~/models/Bout';
import {Fencer} from '~/models/Fencer';
import {BoutRepository} from '~/repositories/BoutRepository';
import {FencerRepository} from '~/repositories/FencerRepository';
import {MatchRepository} from '~/repositories/MatchRepository';

export class FencerService {
    constructor(
        private fencerRepository: FencerRepository,
        private matchRepository: MatchRepository,
        private boutRepository: BoutRepository,
    ) {}
    async getFromMatch(matchId: string): Promise<Fencer[]> {
        const boutsFromMatch = await this.boutRepository.findByMatchId(matchId);
        const fencersFromMatch = await this.findFromBouts(boutsFromMatch);
        return fencersFromMatch;
    }

    async getFromMeet(meetId: string): Promise<Fencer[]> {
        const matchesFromEvent = await this.matchRepository.findByMeetId(meetId);
        const boutsFromMatches = (await Promise.all(matchesFromEvent.map((match) => this.boutRepository.findByMatchId(match.id)))).flat();
        const fencers = this.findFromBouts(boutsFromMatches);
        return fencers;
    }
    private async findFromBouts(bouts: Bout[]): Promise<Fencer[]> {
        const fencers = (await this.fencerRepository.findAll()).filter((fencer) => bouts.some((bout) => bout.fencerAId === fencer.id || bout.fencerBId === fencer.id));
        return fencers;
    }
}
