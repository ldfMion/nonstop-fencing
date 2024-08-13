'use client';
import FencerSummary from '~/models/FencerSummary';
import parseWeapon from 'helpers/parseWeapon';
import FilterSelector from './filter-selector';
import {useState} from 'react';
import FencerRow from './fencer-row';

export default function FilteredFencerTable({fencers}: {fencers: FencerSummary[]}): JSX.Element {
    const options = ['All', 'Foil', 'Epee', 'Saber'];
    const [filter, setFilter] = useState<string>('All');
    let filteredFencers = fencers;

    const handleChange = (value: string) => {
        if (value == '') {
            return;
        }
        setFilter(value);
    };

    if (filter != 'All') {
        const weapon = parseWeapon(filter);
        filteredFencers = filteredFencers.filter((fencer) => fencer.weapon === weapon);
    }

    return (
        <>
            <FilterSelector
                className="justify-start"
                filter={filter}
                options={options}
                handleChange={handleChange}
            />
            {filteredFencers.map((fencer) => (
                <FencerRow fencer={fencer} key={fencer.fullName} />
            ))}
        </>
    );
}
