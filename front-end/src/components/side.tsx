import {University} from '~/models/University';
import NameIcon from './name-icon';

export default function Side({
    university,
    flip,
}: {
    university: University;
    flip?: boolean;
}): React.ReactNode {
    return (
        <NameIcon iconUniversityId={university.id} name={university.displayNameLong} flip={flip} />
    );
}
