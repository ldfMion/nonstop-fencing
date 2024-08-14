import {Team} from '~/models/FencerSummary';
import getUniversityRecord from './getUniversityRecord';
import parseCSV from './parseCsv';
import {University} from '~/models/University';
import Record from '~/models/Record';
import {ITeam} from '~/models/Team';
import {Region} from '~/models/Region';
import assertString from './assertString';
import calculateWinPercentage from './calculateWinPercentage';

let universities: University[] | null = null;

export default async function getUniversitiesfromCsv(): Promise<University[]> {
    if (universities == null) {
        const universitiesWithoutRecord = await parseCSV('../data/universities.csv', parseRow);
        universities = await Promise.all(
            universitiesWithoutRecord.map(async (universityWithoutRecord) => {
                const mens = await getUniversityRecord(universityWithoutRecord.id, Team.MEN);
                const womens = await getUniversityRecord(universityWithoutRecord.id, Team.WOMEN);
                return new UniversityFromCSVWithRecord(
                    universityWithoutRecord,
                    mens,
                    womens,
                    calculateWinPercentage,
                );
            }),
        );
    }
    return universities;
}

function parseRow(row: unknown): UniversityWithoutRecord {
    return new UniversityFromCSV(row);
}

type UniversityWithoutRecord = Omit<University, 'mens' | 'womens' | 'record'>;

class UniversityFromCSV implements UniversityWithoutRecord {
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

class UniversityFromCSVWithRecord implements University {
    public id: string;
    public displayNameShort: string;
    public displayNameLong: string;
    public region: Region;
    public colorTheme: string | null = null;
    public mens: ITeam;
    public womens: ITeam;
    constructor(
        universityWithoutRecord: UniversityWithoutRecord,
        mensRecords: {
            overall: Record;
            foil: Record;
            epee: Record;
            saber: Record;
        },
        womensRecords: {
            overall: Record;
            foil: Record;
            epee: Record;
            saber: Record;
        },
        ratingFn: (record: Record) => number,
    ) {
        this.id = universityWithoutRecord.id;
        this.displayNameShort = universityWithoutRecord.displayNameShort;
        this.displayNameLong = universityWithoutRecord.displayNameLong;
        this.region = universityWithoutRecord.region;
        this.colorTheme = universityWithoutRecord.colorTheme;
        this.mens = {
            ...mensRecords,
            university: this,
            rating: ratingFn(mensRecords.overall),
        };
        this.womens = {
            ...womensRecords,
            university: this,
            rating: ratingFn(womensRecords.overall),
        };
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
