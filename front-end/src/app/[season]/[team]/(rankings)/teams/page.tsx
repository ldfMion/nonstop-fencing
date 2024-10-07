import parseTeam from '~/helpers/parseTeam';
import {getTeams} from '~/api';
import RankingRow from '~/components/ranking-row';
import toTitleCase from '~/helpers/toTitleCase';
import SingleRankingWrapper from '../single-ranking-wrapper';
import type {Metadata} from 'next';

type Props = {
    params: {team: string};
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
                    href={`/${params.team}/universities/${team.university.id}`}
                />
            ))}
        </SingleRankingWrapper>
    );
}
