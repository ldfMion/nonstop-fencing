import {Fencer} from '~/models/Fencer';
import {boutRepository, fencerRepository} from '~/repositories';
import {BoutRepository} from '~/repositories/BoutRepository';
import {FencerRepository} from '~/repositories/FencerRepository';
import {MatchRepository} from '~/repositories/MatchRepository';

export class FencerService {
    constructor(fencerRepository: FencerRepository, matchRepository: MatchRepository, boutRepository: BoutRepository) {}
    async getFromMatch(matchId: string): Promise<Fencer[]> {
        const boutsFromMatch = await boutRepository.findByMatchId(matchId);
        const fencers = (await fencerRepository.findAll()).filter((fencer) => boutsFromMatch.some((bout) => bout.fencerAId === fencer.id || bout.fencerBId === fencer.id));
        return fencers;
    }
}
