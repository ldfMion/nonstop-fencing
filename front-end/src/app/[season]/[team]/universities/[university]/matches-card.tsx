import {Fragment} from 'react';
import ListCard from '~/components/list-card';
import MatchRow from '~/components/match-row';
import {Separator} from '~/components/ui/separator';
import DateComponent from '~/components/date';
import MatchTableHeader from '~/components/match-table-header';
import type {Gender} from '~/models/Gender';
import type {University2} from '~/models/University2';
import {matchService} from '~/services';
import type {Match2} from '~/models/Match2';
import {eventRepository} from '~/repositories';
import type {ISeason} from '~/models/Season';

export default async function MatchesCard({
    university,
    gender,
    season,
}: {
    university: University2;
    gender: Gender;
    season: ISeason;
}): Promise<JSX.Element> {
    // const matches = await getMatchesFromUniversity(university.id, gender);
    const matches = await matchService.get({season: season, gender: gender, university: university});
    const matchesGroupedByDate = await groupMatchesByDate(matches);
    return (
        <ListCard title="Matches" tableHeader={<MatchTableHeader />}>
            {Object.keys(matchesGroupedByDate)
                .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                .map((date) => (
                    <Fragment key={date}>
                        <DateComponent isoDate={date} />
                        <Separator className="" />
                        {matchesGroupedByDate[date]!.map((match) => (
                            <MatchRow match={match} key={match.teamAId + match.teamBId + date} perspective={university} />
                        ))}
                    </Fragment>
                ))}
        </ListCard>
    );
}

async function groupMatchesByDate(matches: Match2[]): Promise<Record<string, Match2[]>> {
    const dateMeetMap: Record<string, Match2[]> = {};
    for (const match of matches) {
        let date: Date;
        if (match.meetId) {
            date = (await eventRepository.findById(match.meetId)).startDate;
        } else {
            date = match.dateFallback!;
        }
        const mapEntry = dateMeetMap[date.toString()];
        if (mapEntry == undefined) {
            dateMeetMap[date.toString()] = [match];
        } else {
            dateMeetMap[date.toString()] = [...mapEntry, match];
        }
    }
    return dateMeetMap;
}
