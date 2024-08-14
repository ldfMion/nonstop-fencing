'use client';
import FencerSummary from '~/models/FencerSummary';
import FilteredFencerTable from './filtered-fencer-table';
import parseWeapon from 'helpers/parseWeapon';

export default function FilteredFencersByWeapon({
    fencers,
}: {
    fencers: FencerSummary[];
}): JSX.Element {
    const options = ['All', 'Foil', 'Epee', 'Saber'];
    return (
        <FilteredFencerTable fencers={fencers} options={options} filterFunction={filterByWeapon} />
    );
}

function filterByWeapon(fencers: FencerSummary[], value: string): FencerSummary[] {
    if (value !== 'All') {
        const weapon = parseWeapon(value);
        return fencers.filter((fencer) => fencer.weapon === weapon);
    }
    return fencers;
}
