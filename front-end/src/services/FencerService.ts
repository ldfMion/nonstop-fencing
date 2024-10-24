import {Bout} from '~/models/Bout';
import {Fencer} from '~/models/Fencer';
import {Gender} from '~/models/Gender';
import {HasRecord} from '~/models/HasRecord';
import {Region} from '~/models/Region';
import {ISeason, Season} from '~/models/Season';
import {University2} from '~/models/University2';
import {Weapon} from '~/models/Weapon';
import {boutRepository, fencerRepository, matchRepository, universityRepository} from '~/repositories';
import {boutService, recordService} from '.';

export class FencerService {
    constructor() {}
    async get(season: ISeason, {university, gender}: {university?: University2; gender?: Gender}): Promise<Fencer[]> {
        let fencers = await fencerRepository.findAll();
        fencers = fencers.filter((fencer) => fencer.season.id === season.id);
        if (university !== undefined) {
            fencers = fencers.filter((fencer) => fencer.universityId == university.id);
        }
        if (gender !== undefined) {
            fencers = fencers.filter((fencer) => fencer.gender === gender);
        }
        return fencers;
    }
    async getFromMatch(matchId: string): Promise<Fencer[]> {
        const boutsFromMatch = await boutRepository.findByMatchId(matchId);
        const fencersFromMatch = await this.findFromBouts(boutsFromMatch);
        return fencersFromMatch;
    }

    async getFromMeet(meetId: string): Promise<Fencer[]> {
        const matchesFromEvent = await matchRepository.findByMeetId(meetId);
        const boutsFromMatches = (await Promise.all(matchesFromEvent.map((match) => boutRepository.findByMatchId(match.id)))).flat();
        const fencers = this.findFromBouts(boutsFromMatches);
        return fencers;
    }
    private async findFromBouts(bouts: Bout[]): Promise<Fencer[]> {
        const fencers = (await fencerRepository.findAll()).filter((fencer) =>
            bouts.some((bout) => bout.fencerAId === fencer.id || bout.fencerBId === fencer.id),
        );
        return fencers;
    }
    async getFromGenderAndWeapon(season: ISeason, gender: Gender, weapon: Weapon): Promise<Fencer[]> {
        return fencerRepository.findByGenderAndWeapon(season, gender, weapon);
    }
    async getRegionsForFencers<T extends Fencer>(fencers: T[]): Promise<(T & {region: Region})[]> {
        return Promise.all(
            fencers.map(async (fencer) => {
                const university = await universityRepository.findById(fencer.universityId);
                return {...fencer, region: university.region};
            }),
        );
    }
    async getById(id: string): Promise<Fencer> {
        return await fencerRepository.findById(id);
    }
    async getSeasonRecords(fencers: Fencer[], season: ISeason): Promise<(Fencer & HasRecord)[]> {
        const fencersWithSeasonRecords: (Fencer & HasRecord)[] = fencers
            .filter((fencer) => fencer.seasonWins && fencer.seasonLosses)
            .map((fencer) => ({
                ...fencer,
                record: {wins: fencer.seasonWins!, losses: fencer.seasonLosses!},
                rating: fencer.seasonWins! - fencer.seasonLosses!,
            }));
        const fencersWithoutSeasonRecords = fencers.filter((fencer) => !fencer.seasonWins && !fencer.seasonLosses);
        let fencersWithCalculatedRecords: (Fencer & HasRecord)[] = [];
        if (fencersWithoutSeasonRecords.length > 0) {
            const seasonBouts = await boutService.get({season});
            fencersWithCalculatedRecords = recordService.calculateRecordsFromBouts(fencersWithoutSeasonRecords, seasonBouts);
        }
        return [...fencersWithSeasonRecords, ...fencersWithCalculatedRecords].sort((a, b) => b.rating - a.rating);
    }
}
