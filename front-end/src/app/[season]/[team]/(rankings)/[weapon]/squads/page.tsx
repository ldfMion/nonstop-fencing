import parseTeam from '~/helpers/parseTeam';
import parseWeapon from '~/helpers/parseWeapon';
import toTitleCase from '~/helpers/toTitleCase';
import type {Metadata} from 'next';
import getSquadsFromTeamAndWeapon from '~/api/getSquadsFromTeamAndWeapon';
import SingleRankingWrapper from '~/app/[season]/[team]/(rankings)/single-ranking-wrapper';
import RankingRow from '~/components/ranking-row';

type Props = {
    params: {team: string; weapon: string};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const teamWeapon = `${params.team} ${params.weapon}`.replace('ns', "n's");
    return {
        title: toTitleCase(teamWeapon),
        description: `Check out top NCAA ${teamWeapon} squads`,
    };
}

export default async function TeamAndWeaponPage({params}: Props) {
    const team = parseTeam(params.team);
    const weapon = parseWeapon(params.weapon);
    const squads = await getSquadsFromTeamAndWeapon(team, weapon);
    const title = toTitleCase(`${params.team} ${params.weapon}`).replace('ns', "n's");
    return (
        <SingleRankingWrapper title={title}>
            {squads.map((squad) => (
                <RankingRow
                    name={squad.university.displayNameShort}
                    record={squad.record}
                    iconUniversityId={squad.university.id}
                    key={squad.university.id}
                    href={`/${params.team}/universities/${squad.university.id}`}
                />
            ))}
        </SingleRankingWrapper>
    );
}
