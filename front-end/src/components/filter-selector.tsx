'use client';
import {ToggleGroup, ToggleGroupItem} from './ui/toggle-group';

export default function FilterSelector({
    className,
    filter,
    options,
    handleChange,
}: {
    options: string[];
    className?: string;
    filter: string;
    handleChange: (value: string) => void;
}): JSX.Element {
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
