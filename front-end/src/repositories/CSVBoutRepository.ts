import {CSVRepository} from './CSVRepository';
import type {Bout, CompletedBout, ScoredBout} from '~/models/Bout';
import type {BoutRepository} from './BoutRepository';
import parseWeapon from '~/helpers/parseWeapon';
import type {Weapon} from '~/models/Weapon';
import type {Fencer} from '~/models/Fencer';
import {parseOptionalRowNumberProperty, parseOptionalRowTextProperty, parseRowNumberProperty, parseRowTextProperty} from '~/helpers/csvUtils';
import assert from 'assert';

export class CSVBoutRepository extends CSVRepository<Bout> implements BoutRepository {
    constructor(...csvFilePaths: string[]) {
        super(...csvFilePaths);
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
    fencerAId?: string;
    fencerBId?: string;
    ncaaStatus: boolean;
    score?: {
        a: number;
        b: number;
    };
    weapon: Weapon;
    order: number;
    winnerId?: string | undefined;
    constructor(row: object) {
        this.id = parseRowTextProperty('id', row);
        this.matchId = parseRowTextProperty('match_id', row);
        this.ncaaStatus = parseRowTextProperty('ncaa_status', row) === 'TRUE';
        this.weapon = parseWeapon(parseRowTextProperty('weapon', row));
        this.order = parseRowNumberProperty('order', row);
        const fencerAIdValue = parseRowTextProperty('fencer_a_id', row);
        const fencerBIdValue = parseRowTextProperty('fencer_b_id', row);
        if (fencerAIdValue == 'BYE' || fencerBIdValue == 'BYE') {
            if (fencerAIdValue != 'BYE') {
                this.fencerAId = fencerAIdValue;
            }
            if (fencerBIdValue != 'BYE') {
                this.fencerBId = fencerBIdValue;
            }
            return;
        }
        this.fencerAId = fencerAIdValue;
        this.fencerBId = fencerBIdValue;
        const winner = parseOptionalRowTextProperty('winner', row);
        const scoreA = parseOptionalRowNumberProperty('score_a', row);
        const scoreB = parseOptionalRowNumberProperty('score_b', row);
        if (scoreB != undefined && scoreA != undefined) {
            this.score = {
                a: scoreA,
                b: scoreB,
            };
            if (this.score.a == this.score.b) {
                if (winner == 'a') {
                    this.winnerId = this.fencerAId;
                } else if (winner == 'b') {
                    this.winnerId = this.fencerBId;
                } else {
                    throw new Error(`Expected winner to be a or b in row ${JSON.stringify(row)}`);
                }
            } else {
                this.winnerId = this.score.a > this.score.b ? this.fencerAId : this.fencerBId;
            }
        } else {
            assert(scoreA == undefined && scoreB == undefined);
            assert(this.fencerAId !== undefined);
            assert(this.fencerBId !== undefined);
            if (winner == 'a') {
                this.winnerId = this.fencerAId;
            } else if (winner == 'b') {
                this.winnerId = this.fencerBId;
            } else {
                throw new Error(`Expected winner to be a or b in row ${JSON.stringify(row)}`);
            }
        }
    }
    hasScore(): this is ScoredBout {
        return this.score != undefined;
    }
    includes(fencer: Fencer): boolean {
        return fencer.id === this.fencerAId || fencer.id === this.fencerBId;
    }
    isCompleted(): this is CompletedBout {
        return this.winnerId != undefined;
    }
}
