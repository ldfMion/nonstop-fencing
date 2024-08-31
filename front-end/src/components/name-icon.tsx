import type {HtmlHTMLAttributes} from 'react';
import TeamIcon from './team-icon';
import ConditionalLinkWrapper from './conditional-link-wrapper';

export default function NameIcon({
    iconUniversityId,
    name,
    flip,
    className,
    href,
}: {
    iconUniversityId: string;
    name: string;
    flip?: boolean;
    href?: string;
} & HtmlHTMLAttributes<HTMLParagraphElement>) {
    return (
        <ConditionalLinkWrapper href={href}>
            <div className={`flex flex-row items-center gap-1 ${flip && 'flex-row-reverse'}`}>
                <TeamIcon universityId={iconUniversityId} size={32} />
                <p className={`h-fit p-0 ${flip && 'text-right'} ${className}`}>{name}</p>
            </div>
        </ConditionalLinkWrapper>
    );
}
