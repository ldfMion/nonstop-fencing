import {ArrowRight} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';
import Link from 'next/link';

export default function ListCard({
    title,
    children,
    titleHref,
}: {
    children: React.ReactNode;
    title?: string;
    titleHref?: string;
}) {
    return (
        <ConditionalLinkWrapper href={titleHref}>
            <Card className="p-2">
                <ConditionalCardTitle title={title} href={titleHref} />
                <CardContent className="p-0">{children}</CardContent>
            </Card>
        </ConditionalLinkWrapper>
    );
}

function ConditionalCardTitle({title, href}: {title?: string; href?: string}): JSX.Element {
    return title ? (
        <CardHeader className="flex flex-row items-center justify-between px-[16px] py-[8px]">
            <CardTitle className="text-xl">{title}</CardTitle>
            {href && <ArrowRight className="!m-0" />}
        </CardHeader>
    ) : (
        <></>
    );
}

function ConditionalLinkWrapper({href, children}: {href?: string; children: React.ReactNode}) {
    return href ? (
        <Link
            href={href}
            className="cursor-pointer transition-all hover:scale-[1.03] hover:bg-accent"
        >
            {children}
        </Link>
    ) : (
        <>{children}</>
    );
}
