import type {ISeason} from '~/models/Season';
import {Season} from '~/models/Season';
import {CSVRepository} from './CSVRepository';
import type {EventRepository} from './EventRepository';
import type {Event} from '~/models/Event';
import {parseOptionalRowTextProperty, parseRowTextProperty} from '~/helpers/csvUtils';

export class CSVEventRepository extends CSVRepository<Event> implements EventRepository {
    protected parseRow(row: object): Event {
        return new EventFromCSV(row, new Season(2025));
    }
    constructor(csvFilePath: string) {
        super(csvFilePath);
    }
    async findBySeason(season: ISeason): Promise<Event[]> {
        return (await this.findAll()).filter((event) => event.season.displayNameShort === season.displayNameShort);
    }
}

class EventFromCSV implements Event {
    id: string;
    displayName: string;
    startDate: Date;
    endDate: Date;
    hostId?: string;
    season: ISeason;
    hasResults: boolean;
    constructor(row: object, season: ISeason) {
        this.displayName = parseRowTextProperty('display_name', row);
        this.hostId = parseOptionalRowTextProperty('host_id', row);
        this.startDate = new Date(parseRowTextProperty('start_date', row));
        this.endDate = new Date(parseRowTextProperty('end_date', row));
        this.id = parseRowTextProperty('id', row);
        this.season = season;
        this.hasResults = parseRowTextProperty('results', row) === 'TRUE';
    }
}
