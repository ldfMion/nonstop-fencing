import {Gender} from './Gender';
import {ISeason} from './Season';
import {Weapon} from './Weapon';

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
