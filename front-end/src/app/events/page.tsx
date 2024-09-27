import get2024EventsFromCSV from 'helpers/get2425EventsFromCSV';

export default async function EventsPage() {
    const events = await get2024EventsFromCSV();
    return (
        <div>
            <h1>Events</h1>
            {events.map((event) => (
                <p>{event.displayName}</p>
            ))}
        </div>
    );
}
