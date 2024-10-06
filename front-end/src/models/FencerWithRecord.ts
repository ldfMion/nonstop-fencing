import {Fencer} from './Fencer';
import Record from './Record';
export interface FencerWithRecord extends Fencer {
    record: Record;
    rating: number;
}
