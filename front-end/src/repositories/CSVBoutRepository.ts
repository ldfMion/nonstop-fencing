import {CSVRepository} from './CSVRepository';
import type {Bout} from '~/models/Bout';
import type {BoutRepository} from './BoutRepository';
import parseWeapon from '~/helpers/parseWeapon';
import type {Weapon} from '~/models/Weapon';
import type {Fencer} from '~/models/Fencer';
import {parseOptionalRowNumberProperty, parseRowNumberProperty, parseRowTextProperty} from '~/helpers/csvUtils';

export class CSVBoutRepository extends CSVRepository<Bout> implements BoutRepository {
    constructor(csvFilePath: string) {
        super(csvFilePath);
    }
    protected parseRow(row: object): Bout {
        return new BoutFromCSV(row);
    }

    async findByMatchId(matchId: string): Promise<Bout[]> {
        const all = await this.findAll();
        const fromMatch = all.filter((bout) => bout.matchId === matchId);
        return fromMatch;
    }
}

class BoutFromCSV implements Bout {
    id: string;
    matchId: string;
    fencerAId: string;
    fencerBId: string;
    ncaaStatus: boolean;
    score?: {
        a: number;
        b: number;
    };
    weapon: Weapon;
    order: number;
    constructor(row: object) {
        this.id = parseRowTextProperty('id', row);
        this.matchId = parseRowTextProperty('match_id', row);
        this.fencerAId = parseRowTextProperty('fencer_a_id', row);
        this.fencerBId = parseRowTextProperty('fencer_b_id', row);
        const scoreA = parseOptionalRowNumberProperty('score_a', row);
        const scoreB = parseOptionalRowNumberProperty('score_b', row);
        if ((scoreA !== undefined && scoreB == undefined) || (scoreA == undefined && scoreB !== undefined)) {
            throw new Error('Both scores or neither must be defined');
        }
        if (scoreA) {
            this.score = {
                a: scoreA,
                b: scoreB!,
            };
        }
        this.ncaaStatus = parseRowTextProperty('ncaa_status', row) === 'TRUE';
        this.weapon = parseWeapon(parseRowTextProperty('weapon', row));
        this.order = parseRowNumberProperty('order', row);
    }
    get winnerId(): string | undefined {
        if (this.isNotBye()) {
            return this.score.a > this.score.b ? this.fencerAId : this.fencerBId;
        }
        return undefined;
    }
    includes(fencer: Fencer): boolean {
        return fencer.id === this.fencerAId || fencer.id === this.fencerBId;
    }
    isNotBye(): this is {fencerAId: string; fencerBId: string; score: {a: number; b: number}; winnerId: string} {
        return this.score != undefined;
    }
}
