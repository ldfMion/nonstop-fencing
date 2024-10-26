import {CSVRepository} from './CSVRepository';
import type {Bout} from '~/models/Bout';
import type {BoutRepository} from './BoutRepository';
import parseWeapon from '~/helpers/parseWeapon';
import type {Weapon} from '~/models/Weapon';
import type {Fencer} from '~/models/Fencer';
import {parseRowTextProperty} from '~/helpers/csvUtils';

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
    scoreA: number;
    scoreB: number;
    ncaaStatus: boolean;
    weapon: Weapon;
    order: number;
    constructor(row: object) {
        this.id = parseRowTextProperty('id', row);
        this.matchId = parseRowTextProperty('match_id', row);
        this.fencerAId = parseRowTextProperty('fencer_a_id', row);
        this.fencerBId = parseRowTextProperty('fencer_b_id', row);
        this.scoreA = parseInt(parseRowTextProperty('score_a', row));
        this.scoreB = parseInt(parseRowTextProperty('score_b', row));
        this.ncaaStatus = parseRowTextProperty('ncaa_status', row) === 'TRUE';
        this.weapon = parseWeapon(parseRowTextProperty('weapon', row));
        this.order = parseInt(parseRowTextProperty('order', row));
    }
    get winnerId() {
        return this.scoreA > this.scoreB ? this.fencerAId : this.fencerBId;
    }
    includes(fencer: Fencer): boolean {
        return fencer.id === this.fencerAId || fencer.id === this.fencerBId;
    }
    isBye(): boolean {
        return isNaN(this.scoreA);
    }
}
