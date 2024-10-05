import {Fragment} from 'react';
import ListCard from '~/components/list-card';
import MatchRowWithoutPerspective from '~/components/match-row/match-row-without-perspective';
import MatchTableHeader from '~/components/match-table-header';
import {Match2} from '~/models/Match2';

export default function MatchesCard({matches}: {matches: Match2[]}) {
    return (
        <ListCard title="Fixtures" tableHeader={<MatchTableHeader />}>
            {matches.map((match) => (
                <MatchRowWithoutPerspective match={match} key={match.id} />
            ))}
        </ListCard>
    );
}
