import type {Event} from '~/models/Event';
import DateComponent from '~/components/date';
import type {University2} from '~/models/University2';
import {universityService} from '~/services';
import ConditionalLinkWrapper from './conditional-link-wrapper';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from './ui/card';
import {Button} from './ui/button';
import Host from './host';

export async function EventCard({event}: {event: Event}) {
    let host: University2 | null = null;
    if (event.hostId) {
        host = await universityService.getById(event.hostId);
    }
    const eventUrl = event.hasResults ? `/events/${event.id}` : undefined;
    return (
        <ConditionalLinkWrapper href={eventUrl} className="cursor-pointer transition-all">
            <Card className="flex h-full flex-col px-6 py-4">
                <div className="flex flex-row items-center justify-between">
                    <CardHeader className="col flex flex-col items-start justify-between gap-2 p-0 [&>*]:!m-0">
                        <CardTitle className="!m-0 text-xl">{event.displayName}</CardTitle>
                        <DateComponent isoDate={event.startDate.toISOString()} />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-between gap-1 p-0">
                        {host && <Host university={host} className="text-lg" />}
                    </CardContent>
                </div>
                {event.hasResults && (
                    <CardFooter className="flex flex-row items-center justify-end p-0">
                        <Button variant="default">Results</Button>
                    </CardFooter>
                )}
            </Card>
        </ConditionalLinkWrapper>
    );
}
