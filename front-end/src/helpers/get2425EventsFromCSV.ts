import {ISeason, Season} from '~/models/Season';
import parseCSV from './parseCsv';
import {Event} from '~/models/Event';

let events: Event[] | null = null;

export default async function get2024EventsFromCSV(): Promise<Event[]> {
    console.log(events == null);
    if (events == null) {
        console.log('Getting records from csv for the first time');
        events = await parseCSV('../data/meets_24_25.csv', parseRow);
        console.log(events);
    }
    return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

function parseRow(row: unknown): Event {
    return new EventFromCSV(row, new Season(2024, 2025));
}

class EventFromCSV implements Event {
    id: string;
    displayName: string;
    startDate: Date;
    endDate: Date;
    hostId: string;
    season: ISeason;
    constructor(row: unknown, season: ISeason) {
        const anyRow = row as any;
        this.displayName = anyRow['display_name'];
        this.hostId = anyRow['host_id'] == '' ? null : anyRow['host_id'];
        this.startDate = new Date(anyRow['start_date']);
        this.endDate = new Date(anyRow['end_date']);
        this.id = anyRow['id'];
        this.season = season;
    }
}
