'use client';
import {Tabs, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {useSelectedLayoutSegment} from 'next/navigation';
import Link from 'next/link';

const subpages: {url: string; title: string}[] = [
    {url: 'overview', title: 'Overview'},
    {url: 'fencers', title: 'Fencers'},
    {url: 'teams', title: 'Teams'},
    {url: 'matches', title: 'Matches'},
];

export function EventTabs(): JSX.Element {
    const segment = useSelectedLayoutSegment();
    console.log(segment);
    const active = segment ?? 'overview';
    return (
        <Tabs value={active} className="[&>*]:mt-0">
            <TabsList className="grid w-full grid-flow-col justify-stretch overflow-y-hidden overflow-x-scroll">
                {subpages.map((page) => (
                    <Tab key={page.url} url={page.url} title={page.title} />
                ))}
            </TabsList>
        </Tabs>
    );
}

function Tab({url, title}: {url: string; title: string}): JSX.Element {
    return (
        <TabsTrigger value={url} key={title}>
            <Link href={url}>{title}</Link>
        </TabsTrigger>
    );
}
