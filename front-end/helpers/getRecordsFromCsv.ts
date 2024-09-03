import FencerSummary, {Team, Weapon} from '~/models/FencerSummary';
import parseWeapon from 'helpers/parseWeapon';
import parseTeam from 'helpers/parseTeam';
import calculatePythagoreanWins from './calculatePythagoreanWins';
import parseCSV from './parseCsv';
import Record from '~/models/Record';
import getUniversity from '~/api/getUniversity';
import {Region} from '~/models/Region';
import calculateOtherRanking from './calculateOtherRanking';

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
    public firstName?: string | undefined;
    public lastName: string;
    public universityId: string;
    public weapon: Weapon;
    public team: Team;
    public record: Record;

    constructor(
        row: unknown,
        private ratingFn: (record: Record) => number,
    ) {
        const anyRow = row as any;
        (this.firstName = anyRow['First name'] === '' ? undefined : anyRow['First name']),
            (this.lastName = anyRow['Last name']),
            (this.universityId = (anyRow['University '] as string).toLowerCase().replace(' ', '')),
            (this.weapon = parseWeapon(anyRow['Weapon'])),
            (this.team = parseTeam(anyRow['Team'])),
            (this.record = {
                wins: parseInt(anyRow['Wins']),
                losses: parseInt(anyRow['Losses']),
            });
    }
    get rating(): number {
        return this.ratingFn(this.record);
    }
    get fullName() {
        return this.firstName ? this.firstName + ' ' + this.lastName : this.lastName;
    }
}

class FencerSummaryWithRegion implements FencerSummary {
    public firstName?: string | undefined;
    public lastName: string;
    public fullName: string;
    public universityId: string;
    public weapon: Weapon;
    public team: Team;
    public record: Record;
    public rating: number;
    public region: Region;
    constructor(fencerWithoutRegion: FencerSummaryWithoutRegion, region: Region) {
        this.firstName = fencerWithoutRegion.firstName;
        this.lastName = fencerWithoutRegion.lastName;
        this.universityId = fencerWithoutRegion.universityId;
        this.weapon = fencerWithoutRegion.weapon;
        this.team = fencerWithoutRegion.team;
        this.record = fencerWithoutRegion.record;
        this.region = region;
        this.rating = fencerWithoutRegion.rating;
        this.fullName = fencerWithoutRegion.fullName;
    }

    toObject(): FencerSummary {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            universityId: this.universityId,
            weapon: this.weapon,
            team: this.team,
            record: this.record,
            rating: this.rating,
            fullName: this.fullName,
            region: this.region,
        };
    }
}
