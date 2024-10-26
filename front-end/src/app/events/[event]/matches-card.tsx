import ListCard from '~/components/list-card';
import MatchRowWithoutPerspective from '~/components/match-row/match-row-without-perspective';
import MatchTableHeader from '~/components/match-table-header';
import type {Match2} from '~/models/Match2';

export default function MatchesCard({matches, title}: {matches: Match2[]; title: string}) {
    return (
        <ListCard title={title} tableHeader={<MatchTableHeader />}>
            {matches.map((match) => (
                <MatchRowWithoutPerspective match={match} key={match.id} />
            ))}
        </ListCard>
    );
}
