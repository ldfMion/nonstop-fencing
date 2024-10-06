import {Fragment} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';

export function AdaptiveTiles({elements, defaultOnMobile}: {elements: {title: string; content: JSX.Element}[][]; defaultOnMobile: string}) {
    return (
        <Fragment>
            <div className="hidden flex-col gap-5 md:flex md:flex-row md:items-start [&>*]:grow">
                {elements.map((col) => (
                    <div className="flex flex-col gap-2">{col.map((element) => element.content)}</div>
                ))}
            </div>
            <MobileContentSelector elements={elements.flat()} defaultTitle={defaultOnMobile} />
        </Fragment>
    );
}

function MobileContentSelector({elements, defaultTitle}: {defaultTitle: string; elements: {title: string; content: JSX.Element}[]}) {
    return (
        <Tabs defaultValue={defaultTitle} className="md:hidden">
            <TabsList className="grid w-full grid-flow-col justify-stretch">
                {elements.map((element) => (
                    <TabsTrigger value={element.title}>{element.title}</TabsTrigger>
                ))}
            </TabsList>
            {elements.map((element) => (
                <TabsContent value={element.title} className="flex flex-col gap-2">
                    {element.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
