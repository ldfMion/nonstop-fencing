'use client';
import FilterSelector from './filter-selector';
import FencerRow from './fencer-row';
import {Fragment, useState} from 'react';
import {FencerWithRecord} from '~/models/FencerWithRecord';

export default function FilteredFencerTable<T extends FencerWithRecord>({
    fencers,
    filterFunction,
    options,
}: {
    fencers: T[];
    filterFunction: (fencers: T[], value: string) => T[];
    options: string[];
}): JSX.Element {
    const [filteredFencers, setFilteredFencers] = useState<FencerWithRecord[]>(fencers);
    const handleChange = (value: string) => {
        setFilteredFencers(() => [...filterFunction(fencers, value)]);
    };
    filteredFencers.sort((a, b) => b.rating - a.rating);

    return (
        <Fragment>
            <FilterSelector className="justify-start" options={options} onFilterChange={handleChange} />
            {filteredFencers.map((fencer) => (
                <FencerRow fencer={fencer} key={fencer.name} />
            ))}
        </Fragment>
    );
}
