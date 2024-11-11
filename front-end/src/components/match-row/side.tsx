import NameIcon from '~/components/name-icon';

export default function Side({
    university,
    flip,
}: {
    university: {
        id: string;
        displayNameShort: string;
        displayNameLong: string;
    };
    flip?: boolean;
}): React.ReactNode {
    return (
        <NameIcon
            iconUniversityId={university.id}
            name={university.displayNameShort}
            flip={flip}
            className=""
            href={`/24-25/mens/universities/${university.id}`}
        />
    );
}
