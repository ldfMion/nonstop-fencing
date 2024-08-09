import FencerSummary from '~/models/FencerSummary';
import TeamIcon from './team-icon';
import Record from './record';

export default function FencerRow({fencer}: {fencer: FencerSummary}) {
    return (
        <div className="flex flex-row items-center justify-between px-[16px] py-[8px]">
            <div className="flex flex-row gap-1">
                <TeamIcon universityId={fencer.universityId} size={24} />
                <div className="h-fit p-0">{fencer.fullName}</div>
            </div>
            <Record record={fencer.record} />
        </div>
    );
}
