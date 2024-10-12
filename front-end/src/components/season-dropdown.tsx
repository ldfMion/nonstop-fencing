'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '~/components/ui/select';
import {SelectGroup} from '@radix-ui/react-select';
import {ISeason} from '~/models/Season';
import {usePathname, useRouter} from 'next/navigation';

export default function SeasonDropdown({selectedSeason, seasons}: {selectedSeason: ISeason; seasons: ISeason[]}): JSX.Element {
    const pathname = usePathname();
    const {push} = useRouter();

    function handleChoose(season: string) {
        let path;
        console.log('---------------');
        console.log(selectedSeason.displayNameShort);
        console.log(pathname);
        console.log(pathname.includes(selectedSeason.displayNameShort));
        if (pathname.includes(selectedSeason.displayNameShort)) {
            path = pathname.replace(selectedSeason.displayNameShort, season);
        } else {
            path = `${season}/${pathname}`;
        }
        console.log('pushing');
        console.log(path);
        push(path);
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
