'use client';
import {ToggleGroup, ToggleGroupItem} from './ui/toggle-group';
import {cn} from '~/lib/utils';

export default function FilterSelector({className, labels, currentFilter, setFilter}: {labels: string[]; className?: string; currentFilter: string; setFilter: (value: string) => void}): JSX.Element {
    const handleChange = (value: string) => {
        if (value == '') {
            return;
        }
        setFilter(value);
    };
    return (
        <ToggleGroup type="single" className={cn('overflow-scroll sm:overflow-clip', className)} defaultValue="All" onValueChange={handleChange} value={currentFilter}>
            {labels.map((value) => (
                <ToggleGroupItem value={value} aria-label={`Filter ${value}`} key={value} className="h-auto text-nowrap rounded-full px-4 py-1">
                    {value}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
