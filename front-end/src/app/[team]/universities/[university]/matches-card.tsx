import {Fragment} from 'react';
import getMatchesFromUniversity from '~/api/getMatchesFromUniversity';
import ListCard from '~/components/list-card';
import MatchRow from '~/components/match-row';
import {Separator} from '~/components/ui/separator';
import type {Team} from '~/models/FencerSummary';
import type Match from '~/models/Match';
import type {University} from '~/models/University';
import Date from '~/components/date';
import MatchTableHeader from '~/components/match-table-header';

export default async function MatchesCard({university, team}: {university: University; team: Team}): Promise<JSX.Element> {
    const matches = await getMatchesFromUniversity(university.id, team);
    const matchesGroupedByDate = groupMatchesByDate(matches);
    return (
        <ListCard title="Fixtures" tableHeader={<MatchTableHeader />}>
            {Object.keys(matchesGroupedByDate).map((date) => (
                <Fragment key={date}>
                    <Date isoDate={date} />
                    <Separator className="" />
                    {matchesGroupedByDate[date]!.map((match) => (
                        <MatchRow match={match} key={match.teamAId + match.teamBId + match.date.toISOString()} perspective={university} />
                    ))}
                </Fragment>
            ))}
        </ListCard>
    );
}

function groupMatchesByDate(matches: Match[]): Record<string, Match[]> {
    const record: Record<string, Match[]> = {};
    for (const match of matches) {
        const time = match.date.toString();
        record[time] = record[time] === undefined ? [match] : [...record[time], match];
    }
    return record;
}
