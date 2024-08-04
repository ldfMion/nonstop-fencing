import FencerSummary from '~/models/FencerSummary';
import FencerRow from './fencer-row';
import StandingsCard from './standings-card';

export default function FencerTable({fencers}: {fencers: FencerSummary[]}) {
    return fencers.map((fencer) => <FencerRow fencer={fencer} key={fencer.fullName} />);
}
