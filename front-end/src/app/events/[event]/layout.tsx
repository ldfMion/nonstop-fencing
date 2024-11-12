import Host from '~/components/host';
import {Card} from '~/components/ui/card';
import {eventRepository} from '~/repositories';
import {universityService} from '~/services';
import Date from '~/components/date';
import {University2} from '~/models/University2';
import {EventTabs} from './event-tabs';
import {Metadata} from 'next';

export async function generateMetadata({params}: {params: {event: string}}): Promise<Metadata> {
    const event = await eventRepository.findById(params.event);
    const title = `${event.displayName} Results - NCAA Fencing`;
    const description = `Check out results and individual stats for ${event.displayName}`;
    return {
        title: title,
        description: description,
        openGraph: {
            images: [`/team-icons/${event.hostId}`],
            title: title,
            description: description,
        },
    };
}

export async function generateStaticParams() {
    const events = await eventRepository.findAll();
    const paths = events.map((event) => ({
        event: event.id,
    }));
    return paths;
}

export const dynamicParams = false;
export const revalidate = false;

export default async function EventLayout({children, params}: {params: {event: string}; children: React.ReactNode}) {
    const event = await eventRepository.findById(params.event);
    const host = event.hostId ? await universityService.getById(event.hostId) : null;
    return (
        <main className="flex flex-col items-stretch gap-5 px-6">
            <EventHeader title={event.displayName} isoDate={event.startDate.toISOString()} host={host} eventId={params.event} />
            {children}
        </main>
    );
}

function EventHeader({title, isoDate, host}: {title: string; isoDate: string; host: University2 | null; eventId: string}) {
    return (
        <Card className="flex flex-col p-6">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-4">
                    <h2 className="text-xl font-extrabold md:text-4xl">{title}</h2>
                    {host && <Host university={host} className="text-xl font-bold" />}
                </div>
                <Date isoDate={isoDate} />
            </div>
            <EventTabs />
        </Card>
    );
}
