'use client';
import FilterSelector from './filter-selector';
import FencerRow from './fencer-row';
import {useState} from 'react';
import assert from 'assert';
import {HasRecord} from '~/models/HasRecord';
import {Fencer} from '~/models/Fencer';

export default function FilteredFencerTable<T extends Fencer & HasRecord>({
    fencers,
    options,
}: {
    fencers: T[];
    options: {
        labels: string[];
        filterFunction: (fencers: T[], value: string) => T[];
    }[];
}): JSX.Element {
    const [currentFilters, setCurrentFilters] = useState<string[]>(
        options.map((option) => {
            assert(option.labels[0] !== undefined);
            return option.labels[0];
        }),
    );
    const handleChange = (value: string, i: number) => {
        const newFilters = [...currentFilters];
        newFilters[i] = value;
        setCurrentFilters(newFilters);
    };
    let filteredFencers = fencers;
    options.forEach((option, i) => {
        assert(currentFilters[i] != undefined);
        filteredFencers = option.filterFunction(filteredFencers, currentFilters[i]);
    });
    filteredFencers.sort((a, b) => b.rating - a.rating);
    return (
        <div className="flex flex-col gap-2">
            {options.map((option, i) => {
                assert(currentFilters[i] !== undefined);
                return (
                    <FilterSelector
                        className="justify-start"
                        labels={option.labels}
                        currentFilter={currentFilters[i]}
                        setFilter={(value) => handleChange(value, i)}
                    />
                );
            })}
            {filteredFencers.map((fencer) => (
                <FencerRow fencer={fencer} key={fencer.name} />
            ))}
        </div>
    );
}
