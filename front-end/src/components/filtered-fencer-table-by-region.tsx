'use client';
import type FencerSummary from '~/models/FencerSummary';
import FilteredFencerTable from './filtered-fencer-table';
import {Region} from '~/models/Region';
import {FencerWithRecord} from '~/models/FencerWithRecord';

const NORTHEAST = 'Northeast';
const MID_ATLANTIC_SOUTH = 'Mid-Atlantic/South';
const WEST = 'West';
const MIDWEST = 'Midwest';
const ALL = 'All';

export default function FilteredFencerTableByRegion({fencers}: {fencers: FencerSummary[]}): JSX.Element {
    const options = [ALL, NORTHEAST, MID_ATLANTIC_SOUTH, WEST, MIDWEST];
    return <FilteredFencerTable fencers={fencers} options={options} filterFunction={filterByRegion} />;
}

function filterByRegion(fencers: FencerSummary[], value: string): FencerSummary[] {
    if (value !== 'All') {
        const region = parseRegion(value);
        return fencers.filter((fencer) => {
            return fencer.region === region;
        });
    }
    return fencers;
}
function parseRegion(value: string) {
    switch (value) {
        case NORTHEAST:
            return Region.NORTHEAST;
        case MID_ATLANTIC_SOUTH:
            return Region.MID_ATLANTIC_SOUTH;
        case WEST:
            return Region.WEST;
        case MIDWEST:
            return Region.MIDWEST;
        default:
            throw new Error(`Unknown region: ${value}`);
    }
}
