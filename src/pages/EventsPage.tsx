import { EventCard } from "../components/EventCard";
import { events } from "../data/events";
import { sortByStart } from "../lib/events";

export function EventsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold">Arrangementer</h1>
            <p className="mt-2 text-slate-600">Trykk på et arrangement for å lese mer og melde deg på.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortByStart(events).map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}
