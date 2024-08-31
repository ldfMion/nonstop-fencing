import type FencerSummary from '~/models/FencerSummary';
import RankingRow from './ranking-row';

export default function FencerRow({fencer}: {fencer: FencerSummary}): React.ReactNode {
    return (
        <RankingRow
            name={fencer.fullName}
            iconUniversityId={fencer.universityId}
            record={fencer.record}
        />
    );
}
