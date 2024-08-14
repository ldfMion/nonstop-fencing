'use client';
import FencerSummary from '~/models/FencerSummary';
import FilterSelector from './filter-selector';
import FencerRow from './fencer-row';
import {useState} from 'react';

export default function FilteredFencerTable({
    fencers,
    filterFunction,
    options,
}: {
    fencers: FencerSummary[];
    filterFunction: (fencers: FencerSummary[], value: string) => FencerSummary[];
    options: string[];
}): JSX.Element {
    const [filteredFencers, setFilteredFencers] = useState<FencerSummary[]>(fencers);
    const handleChange = (value: string) => {
        setFilteredFencers(() => [...filterFunction(fencers, value)]);
    };

    return (
        <>
            <FilterSelector
                className="justify-start"
                options={options}
                onFilterChange={handleChange}
            />
            {filteredFencers.map((fencer) => (
                <FencerRow fencer={fencer} key={fencer.fullName} />
            ))}
        </>
    );
}
