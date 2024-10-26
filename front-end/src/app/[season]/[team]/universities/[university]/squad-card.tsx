import {Fragment} from 'react';
import FilteredFencersByWeapon from '~/components/filtered-fencer-table-by-weapon';
import ListCard from '~/components/list-card';
import {mapFencerWithRecordToObject} from '~/helpers/objectMappers';
import type {Gender} from '~/models/Gender';
import type {ISeason} from '~/models/Season';
import type {University2} from '~/models/University2';
import {fencerService} from '~/services';

export default async function SquadCard({
    university,
    season,
    gender,
}: {
    university: University2;
    season: ISeason;
    gender: Gender;
}): Promise<JSX.Element> {
    const fencers = await fencerService.get(season, {university: university, gender: gender});
    const withRecords = await fencerService.getSeasonRecords(fencers, season);
    const dataUnavailable = fencers.length === 0;
    return (
        <ListCard title="Squad">
            {dataUnavailable ? (
                <Fragment>
                    <p>We currently don&apos;t have this team&apos;s fencers&apos; records.</p>
                    <p>Contact us if you can help!</p>
                </Fragment>
            ) : (
                <FilteredFencersByWeapon fencers={mapFencerWithRecordToObject(withRecords)} />
            )}
        </ListCard>
    );
}
