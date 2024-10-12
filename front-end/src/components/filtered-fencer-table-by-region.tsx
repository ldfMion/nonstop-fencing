'use client';
import type FencerSummary from '~/models/FencerSummary';
import FilteredFencerTable from './filtered-fencer-table';
import {Region} from '~/models/Region';
import {HasRecord} from '~/models/HasRecord';
import {Fencer} from '~/models/Fencer';
import {HasRegion} from '~/models/HasRegion';

const NORTHEAST = 'Northeast';
const MID_ATLANTIC_SOUTH = 'Mid-Atlantic/South';
const WEST = 'West';
const MIDWEST = 'Midwest';
const ALL = 'All';

export default function FilteredFencerTableByRegion({fencers}: {fencers: (Fencer & HasRecord & HasRegion)[]}): JSX.Element {
    const labels = [ALL, NORTHEAST, MID_ATLANTIC_SOUTH, WEST, MIDWEST];
    const options = [
        {
            labels: labels,
            filterFunction: filterByRegion,
        },
    ];
    return <FilteredFencerTable fencers={fencers} options={options} />;
}

function filterByRegion(fencers: (Fencer & HasRecord & HasRegion)[], value: string): (Fencer & HasRecord & HasRegion)[] {
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
