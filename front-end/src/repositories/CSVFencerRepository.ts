import type {FencerRepository} from './FencerRepository';
import type {Fencer} from '~/models/Fencer';
import parseWeapon from '~/helpers/parseWeapon';
import parseTeam from '~/helpers/parseTeam';
import {CSVRepository} from './CSVRepository';
import type {Weapon} from '~/models/Weapon';
import type {Gender} from '~/models/Gender';
import type {ISeason} from '~/models/Season';
import {Season} from '~/models/Season';
import {parseOptionalRowNumberProperty, parseRowTextProperty} from '~/helpers/csvUtils';

export class CSVFencerRepository extends CSVRepository<Fencer> implements FencerRepository {
    protected parseRow(row: object): Fencer {
        return new FencerFromCSV(row);
    }
    constructor(...csvFilePaths: string[]) {
        super(...csvFilePaths);
    }
    async findByGenderAndWeapon(season: ISeason, gender: Gender, weapon: Weapon): Promise<Fencer[]> {
        return (await this.findAll()).filter((fencer) => fencer.gender === gender && fencer.weapon === weapon && fencer.season.id === season.id);
    }
}

class FencerFromCSV implements Fencer {
    id: string;
    name: string;
    universityId: string;
    weapon: Weapon;
    gender: Gender;
    seasonWins?: number;
    seasonLosses?: number;
    season: ISeason;
    constructor(row: object) {
        this.id = parseRowTextProperty('id', row);
        this.name = parseRowTextProperty('name', row);
        this.universityId = parseRowTextProperty('university_id', row);
        this.weapon = parseWeapon(parseRowTextProperty('weapon', row));
        this.gender = parseTeam(parseRowTextProperty('gender', row));
        this.seasonWins = parseOptionalRowNumberProperty('season_wins', row);
        this.seasonLosses = parseOptionalRowNumberProperty('season_losses', row);
        this.season = new Season(parseInt(parseRowTextProperty('season_end_year', row)));
    }
    toObject(): Fencer {
        return {
            ...this,
        };
    }
}
