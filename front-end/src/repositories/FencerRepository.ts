import {Fencer} from '~/models/Fencer';
import {Team, Weapon} from '~/models/FencerSummary';
import {Repository} from './Repository';

export interface FencerRepository extends Repository<Fencer> {
    // findFencersByGenderAndWeapon(gender: Team, weapon: Weapon): Promise<Fencer[]>;
}
