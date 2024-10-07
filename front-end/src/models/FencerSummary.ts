import {FencerWithRecord} from './FencerWithRecord';
import type {Region} from './Region';

export default interface FencerSummary extends FencerWithRecord {
    region: Region;
    toObject?: () => FencerSummary;
}
