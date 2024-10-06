import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';

export function MobileContentSelector({elements, defaultTitle}: {defaultTitle: string; elements: {title: string; content: JSX.Element}[]}) {
    return (
        <Tabs defaultValue={defaultTitle} className="md:hidden">
            <TabsList className="grid w-full grid-cols-2">
                {elements.map((element) => (
                    <TabsTrigger value={element.title}>{element.title}</TabsTrigger>
                ))}
            </TabsList>
            {elements.map((element) => (
                <TabsContent value={element.title}>{element.content}</TabsContent>
            ))}
        </Tabs>
    );
}
