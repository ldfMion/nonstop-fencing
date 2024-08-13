import {HtmlHTMLAttributes} from 'react';
import TeamIcon from './team-icon';

export default function NameIcon({
    iconUniversityId,
    name,
    flip,
    className,
}: {
    iconUniversityId: string;
    name: string;
    flip?: boolean;
} & HtmlHTMLAttributes<HTMLParagraphElement>) {
    return (
        <div className={`flex flex-row gap-1 ${flip && 'flex-row-reverse'}`}>
            <TeamIcon universityId={iconUniversityId} size={24} />
            <p className={`h-fit p-0 ${flip && 'text-right'} ${className}`}>{name}</p>
        </div>
    );
}
