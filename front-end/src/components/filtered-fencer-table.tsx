'use client';
import {useState} from 'react';
import FencerSummary, {Weapon} from '~/models/FencerSummary';
import {ToggleGroup, ToggleGroupItem} from './ui/toggle-group';
import parseWeapon from 'helpers/parseWeapon';
import FencerTable from './fencer-table';

export default function FiteredFencerTable({
    className,
    fencers,
}: {
    className?: string;
    fencers: FencerSummary[];
}) {
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
            <ToggleGroup
                type="single"
                className={className}
                defaultValue="All"
                onValueChange={handleChange}
                value={filter}
            >
                {options.map((value) => (
                    <ToggleGroupItem
                        value={value}
                        aria-label="Toggle underline"
                        key={value}
                        className="h-auto rounded-full px-4 py-1"
                    >
                        {value}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            <FencerTable fencers={filteredFencers} />
        </>
    );
}
