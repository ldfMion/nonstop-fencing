import type {Bout} from '~/models/Bout';
import type {Fencer} from '~/models/Fencer';
import type {ISeason} from '~/models/Season';
import {boutRepository, matchRepository} from '~/repositories';

export class BoutService {
    async getFromMeet(meetId: string): Promise<Bout[]> {
        const matchesFromEvent = await matchRepository.findByMeetId(meetId);
        const boutsFromMatches = (await Promise.all(matchesFromEvent.map((match) => boutRepository.findByMatchId(match.id)))).flat();
        return boutsFromMatches;
    }
    async getBoutsFromFencers(fencers: Fencer[]): Promise<Bout[]> {
        const bouts = await boutRepository.findAll();
        return bouts.filter((bout) => fencers.some((fencer) => bout.fencerAId === fencer.id || bout.fencerBId === fencer.id));
    }
    async get({season, fencers}: {season?: ISeason; fencers?: Fencer[]}): Promise<Bout[]> {
        let bouts = await boutRepository.findAll();
        if (season) {
            bouts = await Promise.all(
                bouts.filter(async (bout) => {
                    const match = await matchRepository.findById(bout.matchId);
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
        return await boutRepository.findByMatchId(matchId);
    }
}
