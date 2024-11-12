import {HasRecord} from '~/models/HasRecord';
import TeamRow from './team-row';
import {University2} from '~/models/University2';
import ListCard from './list-card';
import {Gender} from '~/models/Gender';

export async function TeamList({
    teams,
    url,
    gender,
    title,
}: {
    teams: (University2 & HasRecord)[];
    url?: string;
    gender: Gender;
    title: string;
}): Promise<JSX.Element> {
    return (
        <ListCard title={title} titleHref={url}>
            {teams.map((team) => (
                <TeamRow team={team} gender={gender} key={team.id} />
            ))}
        </ListCard>
    );
}
