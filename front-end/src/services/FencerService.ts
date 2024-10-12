import {Bout} from '~/models/Bout';
import {Fencer} from '~/models/Fencer';
import {Gender} from '~/models/Gender';
import {Region} from '~/models/Region';
import {ISeason} from '~/models/Season';
import {Weapon} from '~/models/Weapon';
import {BoutRepository} from '~/repositories/BoutRepository';
import {FencerRepository} from '~/repositories/FencerRepository';
import {MatchRepository} from '~/repositories/MatchRepository';
import {UniversityRepository} from '~/repositories/UniversityRepository';

export class FencerService {
    constructor(
        private fencerRepository: FencerRepository,
        private matchRepository: MatchRepository,
        private boutRepository: BoutRepository,
        private universityRepository: UniversityRepository,
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
        const fencers = (await this.fencerRepository.findAll()).filter((fencer) =>
            bouts.some((bout) => bout.fencerAId === fencer.id || bout.fencerBId === fencer.id),
        );
        return fencers;
    }
    async getFromGenderAndWeapon(season: ISeason, gender: Gender, weapon: Weapon): Promise<Fencer[]> {
        return this.fencerRepository.findByGenderAndWeapon(gender, weapon);
    }
    async getRegionsForFencers<T extends Fencer>(fencers: T[]): Promise<(T & {region: Region})[]> {
        return Promise.all(
            fencers.map(async (fencer) => {
                const university = await this.universityRepository.findById(fencer.universityId);
                return {...fencer, region: university.region};
            }),
        );
    }
}
