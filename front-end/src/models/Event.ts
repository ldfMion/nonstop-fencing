import type {ISeason} from './Season';

export interface Event {
    id: string;
    displayName: string;
    startDate: Date;
    endDate: Date;
    hostId?: string;
    season: ISeason;
    hasResults: boolean;
}
