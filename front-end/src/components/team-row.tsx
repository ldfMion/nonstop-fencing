import type {University2} from '~/models/University2';
import RankingRow from './ranking-row';
import type {HasRecord} from '~/models/HasRecord';
import {Gender} from '~/models/Gender';

export default function TeamRowWrapper({team, gender}: {team: University2 & HasRecord; gender: Gender}) {
    return <TeamRow team={team} gender={gender} />;
}

function TeamRow({team, gender}: {team: University2 & HasRecord; gender: Gender}) {
    return (
        <RankingRow
            name={team.displayNameShort}
            record={team.record}
            iconUniversityId={team.id}
            key={team.id}
            href={`/24-25/${gender == Gender.MEN ? 'mens' : 'womens'}/universities/${team.id}`}
        />
    );
}
