import parseTeam from 'helpers/parseTeam';
import {getTeams} from '~/api';
import RankingRow from '~/components/ranking-row';
import toTitleCase from 'helpers/toTitleCase';
import SingleRankingWrapper from '../single-ranking-wrapper';

export default async function TeamRankingPage({params}: {params: {team: string}}) {
    const team = parseTeam(params.team);
    const teams = await getTeams(team);
    const title = toTitleCase(`${params.team}`).replace('ns', "n's") + ' Teams';
    return (
        <SingleRankingWrapper title={title}>
            {teams.map((team) => (
                <RankingRow
                    key={team.university.id}
                    name={team.university.displayNameShort}
                    iconUniversityId={team.university.id}
                    record={team.overall}
                />
            ))}
        </SingleRankingWrapper>
    );
}
