import type {University} from '~/models/University';
import type Match from '~/models/Match';
import MatchRowWithPerspective from './match-row-with-perspective';
import assert from 'assert';

export default async function MatchRow({match, perspective}: {match: Match; perspective?: University}) {
    if (perspective) {
        return <MatchRowWithPerspective match={match} perspective={perspective} />;
    }
    assert('match row only works with perspective for now');
}
