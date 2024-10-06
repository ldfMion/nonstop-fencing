import {Gender} from './Gender';
import type Record from './Record';
import type {Region} from './Region';
import {Weapon} from './Weapon';

export default interface FencerSummary {
    universityId: string;
    firstName?: string;
    lastName: string;
    weapon: Weapon;
    team: Gender;
    record: Record;
    rating: number;
    fullName: string;
    region: Region;
    toObject?: () => FencerSummary;
}
