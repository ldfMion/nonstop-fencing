import {Fragment} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';
import clsx from 'clsx';

export function AdaptiveTiles({elements, defaultOnMobile, className}: {elements: {title: string; content: JSX.Element}[][]; defaultOnMobile: string; className?: string}) {
    return (
        <Fragment>
            <div className={clsx(`hidden gap-5 lg:grid [&>*]:grow grid-cols-${elements.length}`, className)}>
                {elements.map((col) => (
                    <div className="flex flex-col gap-2" key={col.toString()}>
                        {col.map((element) => (
                            <Fragment key={element.title}>{element.content}</Fragment>
                        ))}
                    </div>
                ))}
            </div>
            <MobileContentSelector elements={elements.flat()} defaultTitle={defaultOnMobile} />
        </Fragment>
    );
}

function MobileContentSelector({elements, defaultTitle}: {defaultTitle: string; elements: {title: string; content: JSX.Element}[]}) {
    return (
        <Tabs defaultValue={defaultTitle} className="lg:hidden [&>*]:mt-0">
            <TabsList className="grid w-full grid-flow-col justify-stretch overflow-scroll">
                {elements.map((element) => (
                    <TabsTrigger value={element.title} key={element.title}>
                        {element.title}
                    </TabsTrigger>
                ))}
            </TabsList>
            {elements.map((element) => (
                <TabsContent value={element.title} key={element.title} className="flex flex-col gap-2">
                    {element.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
