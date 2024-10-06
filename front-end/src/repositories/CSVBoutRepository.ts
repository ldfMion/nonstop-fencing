import {CSVRepository} from './CSVRepository';
import {Bout} from '~/models/Bout';
import {BoutRepository} from './BoutRepository';
import parseWeapon from '~/helpers/parseWeapon';
import {Weapon} from '~/models/Weapon';

export class CSVBoutRepository extends CSVRepository<Bout> implements BoutRepository {
    constructor(csvFilePath: string) {
        super(csvFilePath);
    }
    protected parseRow(row: unknown): Bout {
        return new BoutFromCSV(row);
    }

    async findByMatchId(matchId: string): Promise<Bout[]> {
        return (await this.findAll()).filter((bout) => bout.matchId === matchId);
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
    constructor(row: unknown) {
        const anyRow = row as any;
        this.id = anyRow['id'];
        this.matchId = anyRow['match_id'];
        this.fencerAId = anyRow['fencer_a_id'];
        this.fencerBId = anyRow['fencer_b_id'];
        this.scoreA = parseInt(anyRow['score_a']);
        this.scoreB = parseInt(anyRow['score_b']);
        this.ncaaStatus = anyRow['ncaa_status'] === 'TRUE';
        this.weapon = parseWeapon(anyRow['weapon']);
    }
}
