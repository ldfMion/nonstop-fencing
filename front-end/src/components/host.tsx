import {University} from '~/models/University';
import NameIcon from './name-icon';

export default function Host({university, className}: {university: University; className?: string}) {
    return (
        <div className="!m-0 flex flex-row items-center gap-1">
            <span className="text-md h-fit align-text-bottom font-bold">@</span>
            <NameIcon iconUniversityId={university.id} name={university.displayNameShort} className={className} />
        </div>
    );
}
