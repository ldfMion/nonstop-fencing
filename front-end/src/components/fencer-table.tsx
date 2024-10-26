import FencerRow from './fencer-row';
import type {HasRecord} from '~/models/HasRecord';
import type {Fencer} from '~/models/Fencer';

export default function FencerTable({fencers}: {fencers: (Fencer & HasRecord)[]}) {
    return fencers.map((fencer) => <FencerRow fencer={fencer} key={fencer.name} />);
}
