import Record from './Record';
import {Region} from './Region';

export default interface FencerSummary {
    universityId: string;
    firstName?: string;
    lastName: string;
    weapon: Weapon;
    team: Team;
    record: Record;
    rating: number;
    fullName: string;
    region: Region;
    toObject?: () => FencerSummary;
}

export enum Weapon {
    FOIL,
    EPEE,
    SABER,
}

export enum Team {
    MEN,
    WOMEN,
}
