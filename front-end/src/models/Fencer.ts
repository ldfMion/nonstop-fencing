import {Team, Weapon} from './FencerSummary';

export interface Fencer {
    id: string;
    universityId: string;
    weapon: Weapon;
    gender: Team;
    name: string;
    toObject?: () => Fencer;
}
