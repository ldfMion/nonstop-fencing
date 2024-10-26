import {CSVRepository} from './CSVRepository';
import type {University2} from '~/models/University2';
import {Region} from '~/models/Region';
import type {Repository} from './Repository';
import {parseRowTextProperty} from '~/helpers/csvUtils';

export class CSVUniversityRepository extends CSVRepository<University2> implements Repository<University2> {
    protected parseRow(row: object): University2 {
        return new UniversityFromCSV(row);
    }
}

class UniversityFromCSV implements University2 {
    public id: string;
    public displayNameShort: string;
    public displayNameLong: string;
    public region: Region;
    public colorTheme: string | null = null;
    public hasMen = true;
    public hasWomen = true;
    constructor(csvRow: object) {
        this.id = parseRowTextProperty('id', csvRow);
        this.displayNameShort = parseRowTextProperty('Display Name Short', csvRow);
        this.displayNameLong = parseRowTextProperty('Display Name Long', csvRow);
        this.region = parseRegion(parseRowTextProperty('Region', csvRow));
        this.colorTheme = parseRowTextProperty('Theme Color', csvRow);
        this.hasMen = true;
        this.hasWomen = true;
    }
}

function parseRegion(data: string) {
    switch (data.toLowerCase()) {
        case 'northeast region':
            return Region.NORTHEAST;
        case 'mid-atlantic/south region':
            return Region.MID_ATLANTIC_SOUTH;
        case 'west region':
            return Region.WEST;
        case 'midwest region':
            return Region.MIDWEST;
        default:
            throw new Error(`Unknown region: ${data}`);
    }
}
