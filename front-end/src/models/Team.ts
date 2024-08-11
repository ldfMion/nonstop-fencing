import Record from './Record';
import {University} from './University';
export interface ITeam {
    overall: Record;
    /*     foil: Record;
    epee: Record;
    saber: Record; */
    university: University;
    rating: number;
}
