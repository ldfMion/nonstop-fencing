import parseTeam from 'helpers/parseTeam';
import parseWeapon from 'helpers/parseWeapon';
import toTitleCase from 'helpers/toTitleCase';
import getSquadsFromTeamAndWeapon from '~/api/getSquadsFromTeamAndWeapon';
import SingleRankingWrapper from '~/app/[team]/(rankings)/single-ranking-wrapper';
import RankingRow from '~/components/ranking-row';

export default async function TeamAndWeaponPage({
    params,
}: {
    params: {team: string; weapon: string};
}) {
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
                />
            ))}
        </SingleRankingWrapper>
    );
}
