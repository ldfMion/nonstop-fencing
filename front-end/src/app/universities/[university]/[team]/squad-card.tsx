import getFencersFromUniversity from '~/api/getFencersFromUniversity';
import FilteredFencersByWeapon from '~/components/filtered-fencer-table-by-weapon';
import ListCard from '~/components/list-card';
import {Team} from '~/models/FencerSummary';
import {University} from '~/models/University';

export default async function SquadCard({
    university,
    team,
}: {
    university: University;
    team: Team;
}): Promise<JSX.Element> {
    const fencers = await getFencersFromUniversity(university.id, team);
    return (
        <ListCard title="Squad">
            <FilteredFencersByWeapon fencers={fencers.map((fencer) => fencer.toObject!())} />
        </ListCard>
    );
}
