import getFencersFromUniversity from '~/api/getFencersFromUniversity';
import FilteredFencersByWeapon from '~/components/filtered-fencer-table-by-weapon';
import ListCard from '~/components/list-card';
import type {Team} from '~/models/FencerSummary';
import type {University} from '~/models/University';

export default async function SquadCard({university, team}: {university: University; team: Team}): Promise<JSX.Element> {
    const fencers = await getFencersFromUniversity(university.id, team);
    const dataUnavailable = fencers.length === 0;
    return (
        <ListCard title="Squad">
            {dataUnavailable ? (
                <>
                    <p>We currently don&apos;t have this team&apos;s fencers&apos; records.</p>
                    <p>Contact us if you can help!</p>
                </>
            ) : (
                <FilteredFencersByWeapon fencers={fencers.map((fencer) => fencer.toObject!())} />
            )}
        </ListCard>
    );
}
