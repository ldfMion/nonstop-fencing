import RankingRow from './ranking-row';
import {HasRecord} from '~/models/HasRecord';
import {Fencer} from '~/models/Fencer';

export default function FencerRow({fencer}: {fencer: Fencer & HasRecord}): React.ReactNode {
    return <RankingRow name={fencer.name} iconUniversityId={fencer.universityId} record={fencer.record} />;
}
