'use client';
import type FencerSummary from '~/models/FencerSummary';
import FilteredFencerTable from './filtered-fencer-table';
import parseWeapon from '~/helpers/parseWeapon';
import {Fencer} from '~/models/Fencer';
import {FencerWithRecord} from '~/models/FencerWithRecord';

export default function FilteredFencersByWeapon({fencers}: {fencers: FencerWithRecord[]}): JSX.Element {
    const options = ['All', 'Foil', 'Epee', 'Saber'];
    return <FilteredFencerTable fencers={fencers} options={options} filterFunction={filterByWeapon} />;
}

function filterByWeapon(fencers: FencerWithRecord[], value: string): FencerWithRecord[] {
    if (value !== 'All') {
        const weapon = parseWeapon(value);
        return fencers.filter((fencer) => fencer.weapon === weapon);
    }
    return fencers;
}
