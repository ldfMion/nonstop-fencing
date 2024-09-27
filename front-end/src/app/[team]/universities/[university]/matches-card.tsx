import getRelativeDateFromISODate from 'helpers/getRelativeDateFromISODate';
import {Fragment} from 'react';
import getMatchesFromUniversity from '~/api/getMatchesFromUniversity';
import ListCard from '~/components/list-card';
import MatchRow from '~/components/match-row';
import {Separator} from '~/components/ui/separator';
import type {Team} from '~/models/FencerSummary';
import type Match from '~/models/Match';
import type {University} from '~/models/University';
import Date from '~/components/date';

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
                        <>
                            <MatchRow match={match} key={match.teamAId + match.teamBId + match.date.toISOString()} perspective={university} />
                        </>
                    ))}
                </Fragment>
            ))}
        </ListCard>
    );
}

function MatchTableHeader(): JSX.Element {
    return (
        <div className="!m-0 flex flex-row items-center justify-end gap-3">
            <div className="!m-0 flex w-14 flex-row items-stretch gap-1 text-right text-gray-500">
                <p className="w-6">F</p>
                <p className="w-6">E</p>
                <p className="w-6">S</p>
            </div>
        </div>
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
