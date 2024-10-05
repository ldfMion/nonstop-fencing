import {Match2} from '~/models/Match2';
import {Repository} from './Repository';

export interface MatchRepository extends Repository<Match2> {
    // existsById(id: string): Promise<boolean>;
    findByMeetId(id: string): Promise<Match2[]>;
}
