import ListCard from '~/components/list-card';
import FilteredFencersByWeaponAndGender from '~/components/filtered-fencer-table-by-weapon-and-gender';
import {mapFencerWithRecordToObject} from '~/helpers/objectMappers';
import type {Bout} from '~/models/Bout';
import {boutService, fencerService, recordService} from '~/services';

export default async function EventFencersPage({params}: {params: {event: string}}) {
    const bouts: Bout[] = await boutService.getFromMeet(params.event);
    const fencers = mapFencerWithRecordToObject(recordService.calculateRecordsFromBouts(await fencerService.getFromMeet(params.event), bouts));
    return (
        <div className="flex w-[600px] max-w-[100%] flex-col items-stretch gap-4 self-center">
            <ListCard title="Fencer Stats">
                <FilteredFencersByWeaponAndGender fencers={fencers} />
            </ListCard>
        </div>
    );
}
