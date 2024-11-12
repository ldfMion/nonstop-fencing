import {matchService} from '~/services';
import MatchesCard from '../matches-card';
import {Gender} from '~/models/Gender';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs';

export default async function EventMatchesPage({params}: {params: {event: string}}) {
    const womensMatches = await matchService.fromMeet(params.event, Gender.WOMEN);
    const mensMatches = await matchService.fromMeet(params.event, Gender.MEN);
    return (
        <div className="flex w-[600px] max-w-[100%] flex-col items-stretch gap-4 self-center">
            <Tabs defaultValue="womens" className="[&>*]:mt-0">
                <TabsList className="grid w-full grid-flow-col justify-stretch overflow-y-hidden overflow-x-scroll">
                    <TabsTrigger value="womens">{"Women's"}</TabsTrigger>
                    <TabsTrigger value="mens">{"Men's"}</TabsTrigger>
                </TabsList>
                {womensMatches.length > 0 && (
                    <TabsContent value="womens" className="flex flex-col gap-2">
                        <MatchesCard title="Women's Matches" matches={womensMatches} />
                    </TabsContent>
                )}
                {mensMatches.length > 0 && (
                    <TabsContent value="mens" className="flex flex-col gap-2">
                        <MatchesCard title="Men's Matches" matches={mensMatches} />
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
}
