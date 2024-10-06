import {Match2} from '~/models/Match2';
import {University2} from '~/models/University2';
import {MatchRepository} from '~/repositories/MatchRepository';
import {UniversityRepository} from '~/repositories/UniversityRepository';

export class UniversityService {
    constructor(
        private universityRepository: UniversityRepository,
        private matchRepository: MatchRepository,
    ) {}
    async getFromMeet(meetId: string): Promise<University2[]> {
        const matchesFromMeet = await this.matchRepository.findByMeetId(meetId);
        return await this.getFromMatches(matchesFromMeet);
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
}
