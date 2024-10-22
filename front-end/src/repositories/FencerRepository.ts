import {Fencer} from '~/models/Fencer';
import {Repository} from './Repository';
import {Gender} from '~/models/Gender';
import {Weapon} from '~/models/Weapon';
import {ISeason} from '~/models/Season';

export interface FencerRepository extends Repository<Fencer> {
    findByGenderAndWeapon(season: ISeason, gender: Gender, weapon: Weapon): Promise<Fencer[]>;
}
