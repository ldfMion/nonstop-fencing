import type FencerSummary from '~/models/FencerSummary';
import FencerRow from './fencer-row';

export default function FencerTable({fencers}: {fencers: FencerSummary[]}) {
    return fencers.map((fencer) => <FencerRow fencer={fencer} key={fencer.fullName} />);
}
