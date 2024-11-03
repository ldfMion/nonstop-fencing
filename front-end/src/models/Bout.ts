import type {Fencer} from './Fencer';
import type {Weapon} from './Weapon';

export interface Bout {
    id: string;
    matchId: string;
    fencerAId?: string;
    fencerBId?: string;
    ncaaStatus: boolean;
    weapon: Weapon;
    winnerId?: string;
    order: number;
    includes(fencer: Fencer): boolean;
    isCompleted(): this is CompletedBout;
    hasScore(): this is ScoredBout;
}

export interface CompletedBout extends Bout {
    fencerAId: string;
    fencerBId: string;
    winnerId: string;
}

export interface ScoredBout extends CompletedBout {
    score: {a: number; b: number};
}
