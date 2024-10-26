import parseTeam from '~/helpers/parseTeam';
import parseWeapon from '~/helpers/parseWeapon';
import toTitleCase from '~/helpers/toTitleCase';
import type {Metadata} from 'next';
import getSquadsFromTeamAndWeapon from '~/api/getSquadsFromTeamAndWeapon';
import SingleRankingWrapper from '~/app/[season]/[team]/(rankings)/single-ranking-wrapper';
import {parseSeason} from '~/helpers/parseSeason';
import TeamRow from '~/components/team-row';

type Props = {
    params: {team: string; weapon: string; season: string};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const teamWeapon = `${params.team} ${params.weapon}`.replace('ns', "n's");
    return {
        title: toTitleCase(teamWeapon),
        description: `Check out top NCAA ${teamWeapon} squads`,
    };
}

export default async function SquadsPage({params}: Props) {
    const gender = parseTeam(params.team);
    const weapon = parseWeapon(params.weapon);
    const season = parseSeason(params.season);
    const squads = await getSquadsFromTeamAndWeapon(season, gender, weapon);
    const title = toTitleCase(`${params.team} ${params.weapon} Squads`).replace('ns', "n's");
    return (
        <SingleRankingWrapper title={title} season={season}>
            {squads.map((squad) => (
                <TeamRow team={squad} gender={gender} key={squad.id} />
            ))}
        </SingleRankingWrapper>
    );
}
