import {University} from './University';

export interface IEvent {
    id: string;
    displayName: string;
    startDate: Date;
    endDate: Date;
    hostId: string;
}
