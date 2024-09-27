import {ISeason} from './Season';

export interface IEvent {
    id: string;
    displayName: string;
    startDate: Date;
    endDate: Date;
    hostId: string | null;
    season: ISeason;
}
