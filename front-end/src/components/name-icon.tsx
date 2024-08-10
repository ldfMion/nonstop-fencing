import Record from './record';
import TeamIcon from './team-icon';

export default function NameIcon({
    iconUniversityId,
    name,
    flip,
}: {
    iconUniversityId: string;
    name: string;
    flip?: boolean;
}) {
    return (
        <div className={`flex flex-row gap-1 ${flip && 'flex-row-reverse'}`}>
            <TeamIcon universityId={iconUniversityId} size={24} />
            <p className={`h-fit p-0 ${flip && 'text-right'}`}>{name}</p>
        </div>
    );
}
