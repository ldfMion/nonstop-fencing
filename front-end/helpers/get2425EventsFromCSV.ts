import FencerSummary, {Team, Weapon} from '~/models/FencerSummary';
import parseWeapon from 'helpers/parseWeapon';
import parseTeam from 'helpers/parseTeam';
import parseCSV from './parseCsv';
import Record from '~/models/Record';
import getUniversity from '~/api/getUniversity';
import {Region} from '~/models/Region';
import calculateOtherRanking from './calculateOtherRanking';
import {IEvent} from '~/models/Event';

let events: IEvent[] | null = null;

export default async function get2024EventsFromCSV(): Promise<IEvent[]> {
    console.log(events == null);
    if (events == null) {
        console.log('Getting records from csv for the first time');
        events = await parseCSV('../data/24-25-schedule.csv', parseRow);
        console.log(event);
    }
    return events;
}

function parseRow(row: unknown): IEvent {
    return new EventFromCSV(row);
}

class EventFromCSV implements IEvent {
    id: string;
    displayName: string;
    startDate: Date;
    endDate: Date;
    hostId: string;
    constructor(row: unknown) {
        const anyRow = row as any;
        this.displayName = anyRow['Meet name'];
        this.hostId = anyRow['Host'];
        this.startDate = new Date(anyRow['Start Date']);
        this.endDate = new Date(anyRow['End Date']);
        this.id = this.displayName + this.hostId + 2425;
    }
}
