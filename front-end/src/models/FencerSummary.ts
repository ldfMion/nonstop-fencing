import {Fencer} from './Fencer';
import {FencerWithRecord} from './FencerWithRecord';
import {Gender} from './Gender';
import type Record from './Record';
import type {Region} from './Region';
import {Weapon} from './Weapon';

export default interface FencerSummary extends FencerWithRecord {
    region: Region;
    toObject?: () => FencerSummary;
}
