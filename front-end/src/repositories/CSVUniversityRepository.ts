import {University} from '~/models/University';
import {CSVRepository} from './CSVRepository';
import {UniversityRepository} from './UniversityRepository';
import {University2} from '~/models/University2';
import {Region} from '~/models/Region';
import assertString from '~/helpers/assertString';

export class CSVUniversityRepository extends CSVRepository<University2> implements UniversityRepository {
    protected parseRow(row: unknown): University2 {
        return new UniversityFromCSV(row);
    }
}

class UniversityFromCSV implements University2 {
    public id: string;
    public displayNameShort: string;
    public displayNameLong: string;
    public region: Region;
    public colorTheme: string | null = null;
    constructor(csvRow: unknown) {
        const anyRow = csvRow as any;
        this.id = anyRow['id'];
        this.displayNameShort = anyRow['Display Name Short'];
        this.displayNameLong = anyRow['Display Name Long'];
        this.region = parseRegion(anyRow['Region']);
        this.colorTheme = anyRow['Theme Color'];
    }
}

function parseRegion(data: any) {
    assertString(data);
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
