import {Gender} from './Gender';
import {University2} from './University2';
import {Weapon} from './Weapon';

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
    isWinner(university: University2, weapon?: Weapon): boolean;
    isLoser(university: University2, weapon?: Weapon): boolean;
}
