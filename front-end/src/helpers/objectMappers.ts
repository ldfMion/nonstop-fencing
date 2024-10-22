import {Fencer} from '~/models/Fencer';
import {HasRecord} from '~/models/HasRecord';
import {HasRegion} from '~/models/HasRegion';

export function mapFencerWithRecordToObject(fencers: (Fencer & HasRecord)[]) {
    return fencers.map((fencer) => ({
        id: fencer.id,
        universityId: fencer.universityId,
        weapon: fencer.weapon,
        gender: fencer.gender,
        name: fencer.name,
        season: {
            id: fencer.season.id,
            startYear: fencer.season.startYear,
            endYear: fencer.season.endYear,
            displayNameLong: fencer.season.displayNameLong,
            displayNameShort: fencer.season.displayNameShort,
        },
        record: {
            wins: fencer.record.wins,
            losses: fencer.record.losses,
        },
        rating: fencer.rating,
    }));
}

export function mapFencerWithRecordAndRegionToObject(fencers: (Fencer & HasRegion & HasRecord)[]) {
    return fencers.map((fencer) => ({
        id: fencer.id,
        universityId: fencer.universityId,
        weapon: fencer.weapon,
        gender: fencer.gender,
        name: fencer.name,
        season: {
            id: fencer.season.id,
            startYear: fencer.season.startYear,
            endYear: fencer.season.endYear,
            displayNameLong: fencer.season.displayNameLong,
            displayNameShort: fencer.season.displayNameShort,
        },
        record: {
            wins: fencer.record.wins,
            losses: fencer.record.losses,
        },
        rating: fencer.rating,
        region: fencer.region,
    }));
}
