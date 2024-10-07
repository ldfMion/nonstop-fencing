import {ISeason, Season} from '~/models/Season';
import {CSVRepository} from './CSVRepository';
import {EventRepository} from './EventRepository';
import {Event} from '~/models/Event';

export class CSVEventRepository extends CSVRepository<Event> implements EventRepository {
    protected parseRow(row: unknown): Event {
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
