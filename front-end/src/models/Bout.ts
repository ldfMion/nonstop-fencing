import {Fencer} from './Fencer';
import {Weapon} from './Weapon';

export interface Bout {
    id: string;
    matchId: string;
    fencerAId: string;
    fencerBId: string;
    scoreA: number;
    scoreB: number;
    ncaaStatus: boolean;
    weapon: Weapon;
    winnerId: string;
    order: number;
    includes(fencer: Fencer): boolean;
    isBye(): boolean;
}
