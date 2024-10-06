import {Bout} from '~/models/Bout';
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
}
