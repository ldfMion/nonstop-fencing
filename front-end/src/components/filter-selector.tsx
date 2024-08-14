'use client';
import {useState} from 'react';
import {ToggleGroup, ToggleGroupItem} from './ui/toggle-group';

export default function FilterSelector({
    className,
    options,
    onFilterChange,
}: {
    options: string[];
    className?: string;
    onFilterChange: (value: string) => void;
}): JSX.Element {
    const [filter, setFilter] = useState<string>(options[0] ?? '');
    const handleChange = (value: string) => {
        console.log('inner change');
        if (value == '') {
            return;
        }
        setFilter(value);
        onFilterChange(value);
    };
    return (
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
                    aria-label={`Filter ${value}`}
                    key={value}
                    className="h-auto rounded-full px-4 py-1"
                >
                    {value}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
