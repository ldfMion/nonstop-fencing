'use client';
import {useState} from 'react';
import {ToggleGroup, ToggleGroupItem} from './ui/toggle-group';
import {cn} from '~/lib/utils';

export default function FilterSelector({className, options, onFilterChange}: {options: string[]; className?: string; onFilterChange: (value: string) => void}): JSX.Element {
    const [filter, setFilter] = useState<string>(options[0] ?? '');
    const handleChange = (value: string) => {
        if (value == '') {
            return;
        }
        setFilter(value);
        onFilterChange(value);
    };
    return (
        <ToggleGroup type="single" className={cn('overflow-scroll md:overflow-auto', className)} defaultValue="All" onValueChange={handleChange} value={filter}>
            {options.map((value) => (
                <ToggleGroupItem value={value} aria-label={`Filter ${value}`} key={value} className="h-auto text-nowrap rounded-full px-4 py-1">
                    {value}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
