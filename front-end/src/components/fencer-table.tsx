import FencerSummary from '~/models/FencerSummary';
import RankingRow from './ranking-row';

export default function FencerTable({fencers}: {fencers: FencerSummary[]}) {
    return fencers.map((fencer) => (
        <RankingRow
            name={fencer.fullName}
            iconUniversityId={fencer.universityId}
            record={fencer.record}
        />
    ));
}
