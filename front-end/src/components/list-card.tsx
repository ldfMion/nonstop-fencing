import {ArrowRight} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';
import Link from 'next/link';

export default function ListCard({
    title,
    children,
    titleHref,
    tableHeader,
}: {
    children: React.ReactNode;
    title?: string;
    titleHref?: string;
    tableHeader?: React.ReactNode;
}) {
    return (
        <ConditionalLinkWrapper href={titleHref}>
            <Card className="flex flex-col px-6 py-4">
                <CardHeaderWrapper title={title} href={titleHref} tableHeader={tableHeader} />
                <CardContent className="flex flex-col gap-0 p-0">
                    <ul className="flex flex-col gap-0 p-0">{children}</ul>
                </CardContent>
            </Card>
        </ConditionalLinkWrapper>
    );
}

function CardHeaderWrapper({
    title,
    href,
    tableHeader,
}: {
    title?: string;
    href?: string;
    tableHeader?: React.ReactNode;
}): JSX.Element {
    return title ? (
        <CardHeader className="m-0 gap-0 p-0">
            <div className="flex flex-row items-center justify-between hover:underline">
                <CardTitle className="text-xl">{title}</CardTitle>
                {href && <ArrowRight className="!m-0" />}
            </div>
            {tableHeader ?? null}
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
