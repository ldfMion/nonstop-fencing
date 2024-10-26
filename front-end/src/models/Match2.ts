import type {Gender} from './Gender';
import type {University2} from './University2';
import type {Weapon} from './Weapon';

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
    hostId: string | undefined;
    meetId: string | undefined;
    gender: Gender;
    seasonId: string;
    dateFallback?: Date;
    isWinner(university: University2, weapon?: Weapon): boolean;
    isLoser(university: University2, weapon?: Weapon): boolean;
    includes(university: University2): boolean;
}
