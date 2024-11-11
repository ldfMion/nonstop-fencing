import type {Region} from './Region';

export interface University2 {
    id: string;
    displayNameShort: string;
    displayNameLong: string;
    region: Region;
    colorTheme?: string;
    hasMen: boolean;
    hasWomen: boolean;
}
