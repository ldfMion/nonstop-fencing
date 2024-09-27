import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '~/components/ui/select';
import {SelectGroup} from '@radix-ui/react-select';
import {ISeason, Season} from '~/models/Season';

export default function SeasonDropdown({selectedSeason}: {selectedSeason: ISeason}): JSX.Element {
    const seasons = [new Season(2023, 2024), new Season(2024, 2025)];
    return (
        <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-medium text-foreground">Season: </p>
            <Select>
                <SelectTrigger className="w-fit">
                    <SelectValue placeholder={selectedSeason.displayNameShort} />
                </SelectTrigger>
                <SelectContent className="w-fit min-w-0">
                    <SelectGroup className="w-fit min-w-0">
                        {seasons.map((season) => (
                            <SelectItem value={season.displayNameShort} key={season.displayNameShort} className="w-fit">
                                {season.displayNameShort}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
