import type {ISeason} from '~/models/Season';
import type {Repository} from './Repository';
import type {Event} from '~/models/Event';

export interface EventRepository extends Repository<Event> {
    findBySeason(season: ISeason): Promise<Event[]>;
}
