import {University} from '~/models/University';
import TeamIcon from './team-icon';

export default function Side({
    university,
    flip,
}: {
    university: University;
    flip?: boolean;
}): React.ReactNode {
    return (
        <div className={`flex w-full flex-row gap-1 ${flip && 'flex-row-reverse'}`}>
            <TeamIcon universityId={university.id} size={24} />
            <div className={`h-fit w-full p-0 ${flip && 'text-right'}`}>
                {university.displayNameShort}
            </div>
        </div>
    );
}
