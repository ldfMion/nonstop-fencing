import {ISeason, Season} from '~/models/Season';
import parseCSV from './parseCsv';
import {IEvent} from '~/models/Event';

let events: IEvent[] | null = null;

export default async function get2024EventsFromCSV(): Promise<IEvent[]> {
    console.log(events == null);
    if (events == null) {
        console.log('Getting records from csv for the first time');
        events = await parseCSV('../data/24-25-schedule.csv', parseRow);
        console.log(events);
    }
    return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

function parseRow(row: unknown): IEvent {
    return new EventFromCSV(row, new Season(2024, 2025));
}

class EventFromCSV implements IEvent {
    id: string;
    displayName: string;
    startDate: Date;
    endDate: Date;
    hostId: string;
    season: ISeason;
    constructor(row: unknown, season: ISeason) {
        const anyRow = row as any;
        this.displayName = anyRow['Meet name'];
        this.hostId = anyRow['Host'] == '' ? null : anyRow['Host'];
        this.startDate = new Date(anyRow['Start Date']);
        this.endDate = new Date(anyRow['End Date']);
        this.id = this.displayName + this.hostId + 2425;
        this.season = season;
    }
}
