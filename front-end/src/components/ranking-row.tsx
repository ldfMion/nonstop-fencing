import Record from './record';
import NameIcon from './name-icon';

export default function RankingRow({
    name,
    iconUniversityId,
    record,
}: {
    iconUniversityId: string;
    name: string;
    record: {wins: number; losses: number};
}) {
    return (
        <div className="flex flex-row items-center justify-between py-[8px]">
            <NameIcon iconUniversityId={iconUniversityId} name={name} />
            <Record record={record} />
        </div>
    );
}
