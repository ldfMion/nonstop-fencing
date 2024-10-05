import Date from '~/components/date';
import {Card} from '~/components/ui/card';
import MatchesCard from './matches-card';
import Host from '~/components/host';
import {University} from '~/models/University';
import getUniversity from '~/api/getUniversity';
import {matchRepository} from '~/repositories';

const EVENT_INFO = {
    title: 'OSU Duals',
    date: '2024-9-29',
    id: '1',
    hostId: 'ohiostate',
};

export default async function OsuOpenPage() {
    const host = await getUniversity(EVENT_INFO.hostId);
    return (
        <main className="flex flex-col items-stretch gap-5 px-6 md:px-24">
            <EventHeader title={EVENT_INFO.title} isoDate={EVENT_INFO.date} host={host} />
            <MatchesCard matches={await matchRepository.findByMeetId(EVENT_INFO.id)} />
        </main>
    );
}

function EventHeader({title, isoDate, host}: {title: string; isoDate: string; host: University}) {
    return (
        <Card className="flex flex-col p-6">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-4">
                    <h2 className="text-xl font-extrabold md:text-4xl">{title}</h2>
                    <Host university={host} className="text-xl font-bold" />
                </div>
                <Date isoDate={isoDate} />
            </div>
        </Card>
    );
}
