import {Fencer} from '~/models/Fencer';
import FencerRow from './fencer-row';
import ListCard from './list-card';
import {HasRecord} from '~/models/HasRecord';

export function PreviewFencerList({fencers, title, url}: {fencers: (Fencer & HasRecord)[]; title: string; url: string}): JSX.Element {
    return (
        <ListCard title={title} key={title} titleHref={url}>
            {fencers.map((fencer) => (
                <FencerRow fencer={fencer} key={fencer.name} />
            ))}
        </ListCard>
    );
}
