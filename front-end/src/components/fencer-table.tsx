import FencerRow from './fencer-row';
import {FencerWithRecord} from '~/models/FencerWithRecord';

export default function FencerTable({fencers}: {fencers: FencerWithRecord[]}) {
    return fencers.map((fencer) => <FencerRow fencer={fencer} key={fencer.name} />);
}
