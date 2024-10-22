import parseTeam from '~/helpers/parseTeam';
import {getTeams} from '~/api';
import toTitleCase from '~/helpers/toTitleCase';
import SingleRankingWrapper from '../single-ranking-wrapper';
import type {Metadata} from 'next';
import {parseSeason} from '~/helpers/parseSeason';
import TeamRow from '~/components/team-row';

type Props = {
    params: {team: string; season: string};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const gender = params.team.replace('ns', "n's");
    const title = toTitleCase(gender);
    const description = `Check out top NCAA ${gender} teams`;
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
        },
    };
}

export default async function TeamRankingPage({params}: Props) {
    const season = parseSeason(params.season);
    const team = parseTeam(params.team);
    const teams = await getTeams(season, team);
    const title = toTitleCase(`${params.team}`).replace('ns', "n's") + ' Teams';
    return (
        <SingleRankingWrapper title={title} season={season}>
            {teams.map((team) => (
                <TeamRow team={team} genderPath={params.team.includes('mens') ? 'mens' : 'womens'} key={team.id} />
            ))}
        </SingleRankingWrapper>
    );
}
