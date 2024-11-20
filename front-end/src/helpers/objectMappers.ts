import type {Fencer} from '~/models/Fencer';
import type {HasRecord} from '~/models/HasRecord';
import type {HasRegion} from '~/models/HasRegion';
import type {University2} from '~/models/University2';
import type {Event} from '~/models/Event';

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

export function mapFencerToObject(fencers: Fencer[]): Fencer[] {
    return fencers.map((fencer) => ({
        id: fencer.id,
        universityId: fencer.universityId,
        weapon: fencer.weapon,
        gender: fencer.gender,
        name: fencer.name,
        seasonLosses: fencer.seasonLosses,
        seasonWins: fencer.seasonWins,
        season: {
            id: fencer.season.id,
            startYear: fencer.season.startYear,
            endYear: fencer.season.endYear,
            displayNameLong: fencer.season.displayNameLong,
            displayNameShort: fencer.season.displayNameShort,
        },
    }));
}

export function mapUniversityToObject(universities: University2[]): University2[] {
    return universities.map((university) => ({
        id: university.id,
        displayNameShort: university.displayNameShort,
        displayNameLong: university.displayNameLong,
        region: university.region,
        colorTheme: university.colorTheme,
        hasMen: university.hasMen,
        hasWomen: university.hasWomen,
    }));
}

export function mapEventToObject(events: Event[]): Event[] {
    return events.map((event) => ({
        id: event.id,
        displayName: event.displayName,
        startDate: event.startDate,
        endDate: event.endDate,
        hostId: event.hostId,
        season: {
            id: event.season.id,
            startYear: event.season.startYear,
            endYear: event.season.endYear,
            displayNameLong: event.season.displayNameLong,
            displayNameShort: event.season.displayNameShort,
        },
        hasResults: event.hasResults,
    }));
}
