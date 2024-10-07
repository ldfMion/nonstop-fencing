import {Bout} from '~/models/Bout';
import {Fencer} from '~/models/Fencer';
import {Match2} from '~/models/Match2';
import {University2} from '~/models/University2';
import {Weapon} from '~/models/Weapon';
import {WithRecord} from '~/models/WithRecord';

export class RecordService {
    constructor() {}
    calculateRecordsFromBouts(fencers: Fencer[], bouts: Bout[]) {
        return fencers.map((fencer) => {
            const wins = bouts.filter((bout) => !bout.isBye() && bout.includes(fencer) && bout.winnerId === fencer.id).length;
            const losses = bouts.filter((bout) => !bout.isBye() && bout.includes(fencer) && bout.winnerId !== fencer.id).length;
            return {
                ...fencer.toObject!(),
                record: {
                    wins: wins,
                    losses: losses,
                },
                rating: wins - losses,
            };
        });
    }
    calculateRecordsFromMatches(universities: University2[], matches: Match2[]): WithRecord<University2>[] {
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
    calculateSquadRecords(universities: University2[], matches: Match2[], weapon: Weapon): WithRecord<University2>[] {
        return universities.map((university) => {
            console.log(university.displayNameShort);
            const wins = matches.filter((match) => {
                const value = match.isWinner(university, weapon);
                return value;
            }).length;
            const losses = matches.filter((match) => match.isLoser(university, weapon)).length;
            console.log(wins, losses);
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
