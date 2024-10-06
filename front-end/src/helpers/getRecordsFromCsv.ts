import FencerSummary from '~/models/FencerSummary';
import parseWeapon from '~/helpers/parseWeapon';
import parseCSV from './parseCsv';
import Record from '~/models/Record';
import getUniversity from '~/api/getUniversity';
import {Region} from '~/models/Region';
import calculateOtherRanking from './calculateOtherRanking';
import {Weapon} from '~/models/Weapon';
import {Gender} from '~/models/Gender';
import parseGender from '~/helpers/parseTeam';

let records: FencerSummary[] | null = null;

export default async function getRecordsfromCsv(): Promise<FencerSummary[]> {
    console.log('Getting records from csv');
    console.log(records == null);
    if (records == null) {
        console.log('Getting records from csv for the first time');
        const fencersWithoutRegion = await parseCSV('../data/records.csv', parseRow);
        records = await Promise.all(
            fencersWithoutRegion.map(async (fencer) => {
                const university = await getUniversity(fencer.universityId);
                const region = university.region;
                return new FencerSummaryWithRegion(fencer, region);
            }),
        );
    }
    return records;
}

function parseRow(row: unknown): FencerSummaryWithoutRegion {
    return new FencerSummaryFromCSV(row, calculateOtherRanking);
}
type FencerSummaryWithoutRegion = Omit<FencerSummary, 'region'>;

class FencerSummaryFromCSV implements FencerSummaryWithoutRegion {
    public id: string;
    public name: string;
    public universityId: string;
    public weapon: Weapon;
    public gender: Gender;
    public record: Record;

    private static idCounter: number = 0;

    constructor(
        row: unknown,
        private ratingFn: (record: Record) => number,
    ) {
        const anyRow = row as any;
        const firstName = anyRow['First name'] === '' ? undefined : anyRow['First name'];
        const lastName = anyRow['Last name'];
        this.id = (FencerSummaryFromCSV.idCounter++).toString();
        this.name = firstName == undefined ? lastName : firstName + ' ' + lastName;
        this.universityId = (anyRow['University '] as string).toLowerCase().replace(' ', '');
        this.weapon = parseWeapon(anyRow['Weapon']);
        this.gender = parseGender(anyRow['Team']);
        this.record = {
            wins: parseInt(anyRow['Wins']),
            losses: parseInt(anyRow['Losses']),
        };
    }
    get rating(): number {
        return this.ratingFn(this.record);
    }
}

class FencerSummaryWithRegion implements FencerSummary {
    public name: string;
    public universityId: string;
    public weapon: Weapon;
    public gender: Gender;
    public record: Record;
    public rating: number;
    public region: Region;
    public id: string;
    constructor(fencerWithoutRegion: FencerSummaryWithoutRegion, region: Region) {
        this.id = fencerWithoutRegion.id;
        this.name = fencerWithoutRegion.name;
        this.universityId = fencerWithoutRegion.universityId;
        this.weapon = fencerWithoutRegion.weapon;
        this.gender = fencerWithoutRegion.gender;
        this.record = fencerWithoutRegion.record;
        this.region = region;
        this.rating = fencerWithoutRegion.rating;
    }

    toObject(): FencerSummary {
        return {
            id: this.id,
            name: this.name,
            universityId: this.universityId,
            weapon: this.weapon,
            gender: this.gender,
            record: this.record,
            rating: this.rating,
            region: this.region,
        };
    }
}
