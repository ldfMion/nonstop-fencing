import {ISeason} from '~/models/Season';
import {Repository} from './Repository';
import {Event} from '~/models/Event';

export interface EventRepository extends Repository<Event> {
    findBySeason(season: ISeason): Promise<Event[]>;
}
