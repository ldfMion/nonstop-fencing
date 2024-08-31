import type Record from './Record';
import type {University} from './University';
export interface ITeam {
    overall: Record;
    foil: Record;
    epee: Record;
    saber: Record;
    university: University;
    rating: number;
}
