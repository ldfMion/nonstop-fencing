import type {Fencer} from './Fencer';
import type {HasRecord} from './HasRecord';
import type {HasRegion} from './HasRegion';
import type {Region} from './Region';

export default interface FencerSummary extends Fencer, HasRecord, HasRegion {
    region: Region;
    toObject?: () => FencerSummary;
}
