import NameIcon from './name-icon';
import type {University2} from '~/models/University2';

export default function Host({university, className}: {university: University2; className?: string}) {
    return (
        <div className="!m-0 flex flex-row items-center gap-1">
            <span className="text-md h-fit align-text-bottom font-bold">@</span>
            <NameIcon iconUniversityId={university.id} name={university.displayNameShort} className={className} />
        </div>
    );
}
