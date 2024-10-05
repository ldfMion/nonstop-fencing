import get2024EventsFromCSV from '~/helpers/get2425EventsFromCSV';
import React from 'react';
import getUniversity from '~/api/getUniversity';
import DateComponent from '~/components/date';
import SeasonDropdown from '~/components/season-dropdown';
import {Card, CardHeader, CardTitle} from '~/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {IEvent} from '~/models/Event';
import {Season} from '~/models/Season';
import {University} from '~/models/University';
import Host from '~/components/host';

export default async function EventsPage() {
    const events = await get2024EventsFromCSV();
    const past = events.filter((event) => event.startDate < new Date());
    const upcoming = events.filter((event) => event.startDate >= new Date());
    const hasPastAndUpcoming = past.length > 0 && upcoming.length > 0;
    return (
        <main className="flex flex-col items-center p-6">
            <div className="w-[600px] max-w-[100%]">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="px-4 text-3xl font-semibold">Events</h2>
                    <SeasonDropdown selectedSeason={new Season(2024, 2025)} />
                </div>
                {hasPastAndUpcoming ? <EventTabsWrapper upcoming={<EventsList events={upcoming} />} past={<EventsList events={past} />} /> : <EventsList events={events} />}
            </div>
        </main>
    );
}

function EventsList({events}: {events: IEvent[]}) {
    if (events.length === 0) {
        return <p>We currently don&apos;t have events for this season yet.</p>;
    }
    return (
        <ol className="flex w-full flex-col items-stretch gap-4">
            {events.map((event) => (
                <li key={event.id}>
                    <EventCard key={event.id} event={event} />
                </li>
            ))}
        </ol>
    );
}

async function EventCard({event}: {event: IEvent}) {
    let host: University | null = null;
    if (event.hostId) {
        host = await getUniversity(event.hostId);
    }
    return (
        <Card className="px-6 py-4">
            <CardHeader className="flex flex-row items-center justify-between p-0 [&>*]:!m-0">
                <div className="flex flex-row items-center gap-1">
                    <CardTitle className="!m-0 text-xl">{event.displayName}</CardTitle>
                    {host && <Host university={host} className="text-lg" />}
                </div>
                <DateComponent isoDate={event.startDate.toISOString()} />
            </CardHeader>
        </Card>
    );
}

function EventTabsWrapper({upcoming, past}: {upcoming: React.ReactNode; past: React.ReactNode}) {
    return (
        <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            <TabsContent value="past" className="pt-4">
                {past}
            </TabsContent>
            <TabsContent value="upcoming" className="pt-4">
                {upcoming}
            </TabsContent>
        </Tabs>
    );
}
