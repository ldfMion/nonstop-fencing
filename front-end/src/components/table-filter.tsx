'use client';
import FilterSelector from './filter-selector';
//! BROKEN

export default function TableFilter<T>({
    className,
    items,
    renderRow,
    options,
}: {
    className?: string;
    items: T[];
    renderRow: (props: {item: T}) => React.ReactNode;
    options: string[];
}): JSX.Element {
    const filter = 'All';
    /*     ;
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
    } */
    const handleChange = (value: string) => {
        console.log('Change');
    };
    const filteredFencers = items;

    return (
        <>
            <FilterSelector
                className={className}
                filter={filter}
                options={options}
                handleChange={handleChange}
            />
            {filteredFencers.map((fencer) =>
                /*                 <RankingRow
                    name={fencer.fullName}
                    iconUniversityId={fencer.universityId}
                    record={fencer.record}
                /> */
                renderRow({item: fencer}),
            )}
        </>
    );
}
