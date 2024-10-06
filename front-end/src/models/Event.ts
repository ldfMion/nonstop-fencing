import {ISeason} from './Season';

export interface Event {
    id: string;
    displayName: string;
    startDate: Date;
    endDate: Date;
    hostId: string | null;
    season: ISeason;
}
