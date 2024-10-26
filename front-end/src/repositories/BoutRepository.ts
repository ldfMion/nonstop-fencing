import type {Bout} from '~/models/Bout';
import type {Repository} from './Repository';

export interface BoutRepository extends Repository<Bout> {
    findByMatchId(matchId: string): Promise<Bout[]>;
}
