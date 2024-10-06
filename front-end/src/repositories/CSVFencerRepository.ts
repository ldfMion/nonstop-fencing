import {FencerRepository} from './FencerRepository';
import {Fencer} from '~/models/Fencer';
import parseWeapon from '~/helpers/parseWeapon';
import parseTeam from '~/helpers/parseTeam';
import {CSVRepository} from './CSVRepository';
import {Weapon} from '~/models/Weapon';
import {Gender} from '~/models/Gender';

const FENCERS_FILENAME = '../../../data/fencers-24-25.csv';

export class CSVFencerRepository extends CSVRepository<Fencer> implements FencerRepository {
    protected parseRow(row: unknown): Fencer {
        return new FencerFromCSV(row);
    }
    constructor(csvFilePath: string) {
        super(csvFilePath);
    }
}

class FencerFromCSV implements Fencer {
    id: string;
    name: string;
    universityId: string;
    weapon: Weapon;
    gender: Gender;
    constructor(row: unknown) {
        const anyRow = row as any;
        this.id = anyRow['id'];
        this.name = anyRow['name'];
        this.universityId = anyRow['university_id'];
        this.weapon = parseWeapon(anyRow['weapon']);
        this.gender = parseTeam(anyRow['gender']);
    }
    toObject(): Fencer {
        return {
            id: this.id,
            name: this.name,
            universityId: this.universityId,
            weapon: this.weapon,
            gender: this.gender,
        };
    }
}
