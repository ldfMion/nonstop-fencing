import {FencerRepository} from './FencerRepository';
import {Fencer} from '~/models/Fencer';
import parseWeapon from '~/helpers/parseWeapon';
import parseTeam from '~/helpers/parseTeam';
import {CSVRepository} from './CSVRepository';
import {Weapon} from '~/models/Weapon';
import {Gender} from '~/models/Gender';
import {ISeason, Season} from '~/models/Season';

export class CSVFencerRepository extends CSVRepository<Fencer> implements FencerRepository {
    protected parseRow(row: unknown): Fencer {
        console.log('parsing fencer row');
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
    constructor(row: unknown) {
        const anyRow = row as any;
        this.id = anyRow['id'];
        this.name = anyRow['name'];
        this.universityId = anyRow['university_id'];
        this.weapon = parseWeapon(anyRow['weapon']);
        this.gender = parseTeam(anyRow['gender']);
        if (anyRow['season_wins'] != undefined) {
            this.seasonWins = parseInt(anyRow['season_wins']);
            console.log('has season wins');
            console.log(this.seasonWins);
        }
        if (anyRow['season_losses'] != undefined) {
            this.seasonLosses = parseInt(anyRow['season_losses']);
            console.log('has season losses');
            console.log(this.seasonLosses);
        }
        this.season = new Season(parseInt(anyRow['season_end_year']));
    }
    toObject(): Fencer {
        return {
            ...this,
        };
    }
}
