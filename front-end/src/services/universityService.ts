import type {Match2} from '~/models/Match2';
import type {University2} from '~/models/University2';
import type {ISeason} from '~/models/Season';
import type {Gender} from '~/models/Gender';
import type {HasRecord} from '~/models/HasRecord';
import assert from 'assert';
import {matchRepository, universityRepository} from '~/repositories';
import {matchService, recordService} from '.';

export class UniversityService {
    async getFromMeet(meetId: string, gender: Gender): Promise<(University2 & HasRecord)[]> {
        const matchesFromMeet = (await matchRepository.findByMeetId(meetId)).filter((match) => match.gender === gender);
        const universities = await this.getFromMatches(matchesFromMeet);
        const withRecord = recordService.calculateRecordsFromMatches(universities, matchesFromMeet).sort((a, b) => b.rating - a.rating);
        return withRecord;
    }
    private async getFromMatches(matches: Match2[]): Promise<University2[]> {
        const all = (
            await Promise.all(
                matches.map(async (match) => {
                    const a = await universityRepository.findById(match.teamAId);
                    const b = await universityRepository.findById(match.teamBId);
                    return [a, b];
                }),
            )
        ).flat();
        const unique = [...new Set(all)];
        return unique;
    }
    async getById(id: string): Promise<University2> {
        return await universityRepository.findById(id);
    }
    async get(): Promise<University2[]> {
        return await universityRepository.findAll();
    }
    async getByIdWithRecord(id: string, gender: Gender, season: ISeason): Promise<University2 & HasRecord> {
        const university = await universityRepository.findById(id);
        const matches = await matchService.get({season: season, gender: gender, university: university});
        const universityWithRecord = recordService.calculateRecordsFromMatches([university], matches)[0];
        assert(universityWithRecord != undefined);
        return universityWithRecord;
    }
}
