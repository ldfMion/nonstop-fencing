import RankingRow from './ranking-row';
import {FencerWithRecord} from '~/models/FencerWithRecord';

export default function FencerRow({fencer}: {fencer: FencerWithRecord}): React.ReactNode {
    return <RankingRow name={fencer.name} iconUniversityId={fencer.universityId} record={fencer.record} />;
}
