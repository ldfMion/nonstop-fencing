import {Fragment} from 'react';
import ListCard from '~/components/list-card';
import SeasonDropdown from '~/components/season-dropdown';
import {ISeason, Season} from '~/models/Season';
export default function SingleRankingWrapper({title, children, season}: {title: string; children: React.ReactNode; season: ISeason}) {
    return (
        <Fragment>
            <div className="flex flex-row items-end justify-between">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <SeasonDropdown seasons={[{...new Season(2024)}, {...new Season(2025)}]} selectedSeason={{...season}} />
            </div>
            <ListCard>{children}</ListCard>
        </Fragment>
    );
}
