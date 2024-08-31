import type {Region} from './Region';
import type {ITeam} from './Team';

export interface University {
    id: string;
    displayNameShort: string;
    displayNameLong: string;
    region: Region;
    colorTheme: string | null;
    mens: ITeam;
    womens: ITeam;
}
