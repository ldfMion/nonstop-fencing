import {Fencer} from './Fencer';
import {HasRecord} from './HasRecord';
import {HasRegion} from './HasRegion';
import type {Region} from './Region';

export default interface FencerSummary extends Fencer, HasRecord, HasRegion {
    region: Region;
    toObject?: () => FencerSummary;
}
