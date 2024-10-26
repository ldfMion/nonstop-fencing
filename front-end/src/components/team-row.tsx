import type {University2} from '~/models/University2';
import RankingRow from './ranking-row';
import type {HasRecord} from '~/models/HasRecord';
import type {ITeam} from '~/models/Team';
import type {Squad} from '~/models/Squad';

export default function TeamRowWrapper({team, genderPath}: {team: (University2 & HasRecord) | ITeam | Squad; genderPath: 'mens' | 'womens'}) {
    if ('id' in team) {
        // is a University2 & HasRecord
        return <TeamRow team={team} genderPath={genderPath} />;
    }
    if ('overall' in team) {
        // is a ITeam
        return (
            <RankingRow
                name={team.university.displayNameShort}
                record={team.overall}
                iconUniversityId={team.university.id}
                href={`/${genderPath}/universities/${team.university.id}`}
                key={team.university.id}
            />
        );
    }
    // is a squad
    return (
        <RankingRow
            name={team.university.displayNameShort}
            record={team.record}
            iconUniversityId={team.university.id}
            href={`/${genderPath}/universities/${team.university.id}`}
            key={team.university.id}
        />
    );
}

function TeamRow({team, genderPath}: {team: University2 & HasRecord; genderPath: string}) {
    return (
        <RankingRow
            name={team.displayNameShort}
            record={team.record}
            iconUniversityId={team.id}
            key={team.id}
            href={`/${genderPath}/mens/universities/${team.id}`}
        />
    );
}
