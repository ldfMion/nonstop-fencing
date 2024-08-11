import {ITeam} from './Team';

export interface University {
    id: string;
    displayNameShort: string;
    displayNameLong: string;
    region: string;
    colorTheme: string | null;
    mens: ITeam;
    womens: ITeam;
}
