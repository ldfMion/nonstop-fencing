import {Gender} from './Gender';
import {University2} from './University2';

export interface Match2 {
    id: string;
    teamAId: string;
    teamBId: string;
    overallA: number;
    overallB: number;
    foilA: number;
    foilB: number;
    epeeA: number;
    epeeB: number;
    saberA: number;
    saberB: number;
    hostId: string;
    meetId: string;
    gender: Gender;
    isWinner(university: University2): boolean;
    isLoser(university: University2): boolean;
}
