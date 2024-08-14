import {Region} from './Region';
import {ITeam} from './Team';

export interface University {
    id: string;
    displayNameShort: string;
    displayNameLong: string;
    region: Region;
    colorTheme: string | null;
    mens: ITeam;
    womens: ITeam;
}
