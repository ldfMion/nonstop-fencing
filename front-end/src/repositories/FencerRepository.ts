import type {Fencer} from '~/models/Fencer';
import type {Repository} from './Repository';
import type {Gender} from '~/models/Gender';
import type {Weapon} from '~/models/Weapon';
import type {ISeason} from '~/models/Season';

export interface FencerRepository extends Repository<Fencer> {
    findByGenderAndWeapon(season: ISeason, gender: Gender, weapon: Weapon): Promise<Fencer[]>;
}
