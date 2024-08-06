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
                onValueChange={setFilter}
            >
                {options.map((value) => (
                    <ToggleGroupItem value={value} aria-label="Toggle underline">
                        {value}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            <FencerTable fencers={filteredFencers} />
        </>
    );
}
