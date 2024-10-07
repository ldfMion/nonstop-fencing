'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '~/components/ui/select';
import {SelectGroup} from '@radix-ui/react-select';
import {ISeason} from '~/models/Season';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export default function SeasonDropdown({selectedSeason, seasons}: {selectedSeason: ISeason; seasons: ISeason[]}): JSX.Element {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    function handleChoose(season: string) {
        const params = new URLSearchParams(searchParams);
        params.set('season', season);
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="flex flex-row items-center gap-2 p-2">
            <Select onValueChange={handleChoose}>
                <SelectTrigger className="w-fit !rounded-custom bg-white">
                    <SelectValue placeholder={selectedSeason.displayNameLong} />
                </SelectTrigger>
                <SelectContent className="w-fit min-w-0">
                    <SelectGroup className="w-fit min-w-0">
                        {seasons.map((season) => (
                            <SelectItem value={season.displayNameShort} key={season.displayNameShort} className="w-fit">
                                {season.displayNameLong}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
