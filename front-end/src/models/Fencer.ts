import type {Gender} from './Gender';
import type {ISeason} from './Season';
import type {Weapon} from './Weapon';

export interface Fencer {
    id: string;
    universityId: string;
    weapon: Weapon;
    gender: Gender;
    name: string;
    seasonWins?: number;
    seasonLosses?: number;
    season: ISeason;
}
