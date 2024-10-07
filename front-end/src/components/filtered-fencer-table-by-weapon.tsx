'use client';
import type FencerSummary from '~/models/FencerSummary';
import FilteredFencerTable from './filtered-fencer-table';
import parseWeapon from '~/helpers/parseWeapon';
import {Fencer} from '~/models/Fencer';
import {FencerWithRecord} from '~/models/FencerWithRecord';

export default function FilteredFencersByWeapon({fencers}: {fencers: FencerWithRecord[]}): JSX.Element {
    const weaponLabels = ['All', 'Foil', 'Epee', 'Saber'];
    const options = [
        {
            labels: weaponLabels,
            filterFunction: filterByWeapon,
        },
    ];
    return <FilteredFencerTable fencers={fencers} options={options} />;
}

function filterByWeapon(fencers: FencerWithRecord[], value: string): FencerWithRecord[] {
    if (value !== 'All') {
        const weapon = parseWeapon(value);
        return fencers.filter((fencer) => fencer.weapon === weapon);
    }
    return fencers;
}
