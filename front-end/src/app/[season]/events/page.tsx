import React from 'react';
import SeasonDropdown from '~/components/season-dropdown';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs';
import type {Event} from '~/models/Event';
import {Season} from '~/models/Season';
import {eventRepository} from '~/repositories';
import {EventCard} from '~/components/event-card';

export default async function EventsPage({params}: {params: {season: string}}) {
    let currentSeason;
    if (params.season) {
        if (params.season == '23-24') {
            currentSeason = new Season(2024);
        } else if (params.season == '24-25') {
            currentSeason = new Season(2025);
        } else {
            throw new Error(`Invalid season ${params.season}`);
        }
    } else {
        currentSeason = new Season(2025);
    }
    const events = (await eventRepository.findBySeason(currentSeason)).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const past = events.filter((event) => event.startDate < new Date()).reverse();
    const upcoming = events.filter((event) => event.startDate >= new Date());
    const hasPastAndUpcoming = past.length > 0 && upcoming.length > 0;
    return (
        <main className="flex flex-col items-center p-6">
            <div className="w-[600px] max-w-[100%]">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="px-4 text-3xl font-semibold">Events</h2>
                    <SeasonDropdown selectedSeason={{...currentSeason}} seasons={[{...new Season(2025)}]} />
                </div>
                {hasPastAndUpcoming ? (
                    <EventTabsWrapper upcoming={<EventsList events={upcoming} />} past={<EventsList events={past} />} />
                ) : (
                    <EventsList events={events} />
                )}
            </div>
        </main>
    );
}

function EventsList({events}: {events: Event[]}) {
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

function EventTabsWrapper({upcoming, past}: {upcoming: React.ReactNode; past: React.ReactNode}) {
    return (
        <Tabs defaultValue="past" className="w-full">
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
