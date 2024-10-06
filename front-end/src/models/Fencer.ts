import {Gender} from './Gender';
import {Weapon} from './Weapon';

export interface Fencer {
    id: string;
    universityId: string;
    weapon: Weapon;
    gender: Gender;
    name: string;
    toObject?: () => Fencer;
}
