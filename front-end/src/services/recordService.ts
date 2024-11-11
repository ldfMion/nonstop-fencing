import type {Bout} from '~/models/Bout';
import type {Fencer} from '~/models/Fencer';
import type {Match2} from '~/models/Match2';
import type {University2} from '~/models/University2';
import type {Weapon} from '~/models/Weapon';
import type Record from '~/models/Record';
import type {HasRecord} from '~/models/HasRecord';

export class RecordService {
    calculateRecordsFromBouts<T extends Fencer>(fencers: T[], bouts: Bout[]): (T & {record: Record; rating: number})[] {
        return fencers.map((fencer) => {
            const wins = bouts.filter((bout) => bout.isCompleted() && bout.includes(fencer) && bout.winnerId === fencer.id);
            const losses = bouts.filter((bout) => bout.isCompleted() && bout.includes(fencer) && bout.winnerId !== fencer.id);
            return {
                ...fencer,
                record: {
                    wins: wins.length,
                    losses: losses.length,
                },
                // rating: wins.length + losses.length == 0 ? 0 : wins.length * (wins.length / (wins.length + losses.length)),
                rating: wins.length * 3 - losses.length,
            };
        });
    }
    calculateRecordsFromMatches(universities: University2[], matches: Match2[]): (University2 & HasRecord)[] {
        return universities.map((university) => {
            const wins = matches.filter((match) => match.isWinner(university)).length;
            const losses = matches.filter((match) => match.isLoser(university)).length;
            return {
                ...university,
                record: {
                    wins: wins,
                    losses: losses,
                },
                rating: wins - losses,
            };
        });
    }
    calculateSquadRecords(universities: University2[], matches: Match2[], weapon: Weapon): (University2 & HasRecord)[] {
        return universities.map((university) => {
            const wins = matches.filter((match) => {
                const value = match.isWinner(university, weapon);
                return value;
            }).length;
            const losses = matches.filter((match) => match.isLoser(university, weapon)).length;
            return {
                ...university,
                record: {
                    wins: wins,
                    losses: losses,
                },
                rating: wins - losses,
            };
        });
    }
}
