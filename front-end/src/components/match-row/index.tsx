import MatchRowWithPerspective from './match-row-with-perspective';
import assert from 'assert';
import {University2} from '~/models/University2';
import {Match2} from '~/models/Match2';

export default async function MatchRow({match, perspective}: {match: Match2; perspective?: University2}) {
    if (perspective) {
        return <MatchRowWithPerspective match={match} perspective={perspective} />;
    }
    assert('match row only works with perspective for now');
}
