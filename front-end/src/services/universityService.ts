import {Match2} from '~/models/Match2';
import {University2} from '~/models/University2';
import {MatchRepository} from '~/repositories/MatchRepository';
import {UniversityRepository} from '~/repositories/UniversityRepository';
import {RecordService} from './recordService';
import {MatchService} from './MatchService';
import {ISeason, Season} from '~/models/Season';
import {Gender} from '~/models/Gender';
import {HasRecord} from '~/models/HasRecord';
import assert from 'assert';

export class UniversityService {
    constructor(
        private universityRepository: UniversityRepository,
        private matchRepository: MatchRepository,
        private recordService: RecordService,
        private matchService: MatchService,
    ) {}
    async getFromMeet(meetId: string, gender: Gender): Promise<(University2 & HasRecord)[]> {
        const matchesFromMeet = (await this.matchRepository.findByMeetId(meetId)).filter((match) => match.gender === gender);
        const universities = await this.getFromMatches(matchesFromMeet);
        const withRecord = this.recordService.calculateRecordsFromMatches(universities, matchesFromMeet);
        return withRecord;
    }
    private async getFromMatches(matches: Match2[]): Promise<University2[]> {
        const all = (
            await Promise.all(
                matches.map(async (match) => {
                    const a = await this.universityRepository.findById(match.teamAId);
                    const b = await this.universityRepository.findById(match.teamBId);
                    return [a, b];
                }),
            )
        ).flat();
        const unique = [...new Set(all)];
        return unique;
    }
    async getById(id: string): Promise<University2> {
        return await this.universityRepository.findById(id);
    }
    async get(): Promise<University2[]> {
        return await this.universityRepository.findAll();
    }
    async getByIdWithRecord(id: string, gender: Gender, season: ISeason): Promise<University2 & HasRecord> {
        const university = await this.universityRepository.findById(id);
        const matches = await this.matchService.get({season: season, gender: gender, university: university});
        const universityWithRecord = this.recordService.calculateRecordsFromMatches([university], matches)[0];
        assert(universityWithRecord != undefined);
        return universityWithRecord;
    }
}
