import {Fencer} from '~/models/Fencer';
import {Repository} from './Repository';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';

export interface FencerRepository extends Repository<Fencer> {
    findByGenderAndWeapon(gender: Gender, weapon: Weapon): Promise<Fencer[]>;
}
