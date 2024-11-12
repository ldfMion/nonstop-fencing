import Record from './record';
import NameIcon from './name-icon';
import ConditionalLinkWrapper from './conditional-link-wrapper';

export default function RankingRow({
    name,
    iconUniversityId,
    record,
    href,
}: {
    iconUniversityId: string;
    name: string;
    record: {wins: number; losses: number};
    href?: string;
}) {
    return (
        <ConditionalLinkWrapper href={href} className="cursor-pointer rounded-md transition-all hover:scale-[1.01] hover:bg-accent">
            <li className="flex flex-row items-center justify-between py-2">
                <NameIcon iconUniversityId={iconUniversityId} name={name} />
                <Record record={record} />
            </li>
        </ConditionalLinkWrapper>
    );
}
