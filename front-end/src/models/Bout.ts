import type {Fencer} from './Fencer';
import type {Weapon} from './Weapon';

export interface Bout {
    id: string;
    matchId: string;
    fencerAId?: string;
    fencerBId?: string;
    ncaaStatus: boolean;
    score?: {
        a: number;
        b: number;
    };
    weapon: Weapon;
    winnerId?: string;
    order: number;
    includes(fencer: Fencer): boolean;
    isNotBye(): this is {fencerAId: string; fencerBId: string; score: {a: number; b: number}; winnerId: string};
}
