import {eventRepository, fencerRepository, universityRepository} from '~/repositories';
import {fencerService} from '~/services';
import {Season} from '~/models/Season';
import {MatchEntryForm} from './match-entry-form';
import {mapEventToObject, mapFencerToObject, mapFencerWithRecordAndRegionToObject, mapUniversityToObject} from '~/helpers/objectMappers';

export default async function AdminPage() {
    const universities = await universityRepository.findAll();
    const events = await eventRepository.findAll();
    const fencers = await fencerService.get(new Season(2025), {});
    return (
        <main className="flex w-full flex-col gap-4 p-20">
            <h2 className="text-2xl font-bold">Add match</h2>
            <MatchEntryForm
                allFencers={mapFencerToObject(fencers)}
                allUniversities={mapUniversityToObject(universities)}
                allEvents={mapEventToObject(events)}
            />
        </main>
    );
}
