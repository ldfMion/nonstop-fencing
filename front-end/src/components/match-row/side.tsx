import NameIcon from '~/components/name-icon';
import {University} from '~/models/University';

export default function Side({university, flip}: {university: University; flip?: boolean}): React.ReactNode {
    return <NameIcon iconUniversityId={university.id} name={university.displayNameShort} flip={flip} className="" href={`/mens/universities/${university.id}`} />;
}
