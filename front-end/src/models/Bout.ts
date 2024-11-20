import type {Fencer} from './Fencer';
import type {Weapon} from './Weapon';

export interface BoutModel {
    id: string;
    matchId: string;
    fencerAId?: string;
    fencerBId?: string;
    ncaaStatus: boolean;
    weapon: Weapon;
    winnerId?: string;
    order: number;
}

export interface Bout extends BoutModel {
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
