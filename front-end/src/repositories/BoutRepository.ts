import {Bout} from '~/models/Bout';
import {Repository} from './Repository';

export interface BoutRepository extends Repository<Bout> {
    findByMatchId(matchId: string): Promise<Bout[]>;
}
