'use client';
import FilteredFencerTable from './filtered-fencer-table';
import parseWeapon from '~/helpers/parseWeapon';
import type {HasRecord} from '~/models/HasRecord';
import type {Fencer} from '~/models/Fencer';

export default function FilteredFencersByWeapon({fencers}: {fencers: (Fencer & HasRecord)[]}): JSX.Element {
    const weaponLabels = ['All', 'Foil', 'Epee', 'Saber'];
    const options = [
        {
            labels: weaponLabels,
            filterFunction: filterByWeapon,
        },
    ];
    return <FilteredFencerTable fencers={fencers} options={options} />;
}

function filterByWeapon(fencers: (Fencer & HasRecord)[], value: string): (Fencer & HasRecord)[] {
    if (value !== 'All') {
        const weapon = parseWeapon(value);
        return fencers.filter((fencer) => fencer.weapon === weapon);
    }
    return fencers;
}
