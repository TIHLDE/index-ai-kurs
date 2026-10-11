import { Link } from "react-router";
import { EventCard } from "../components/EventCard";
import { events } from "../data/events";
import { groups } from "../data/groups";
import { sortByStart } from "../lib/events";

export function HomePage() {
    const nextEvents = sortByStart(events).slice(0, 3);

    return (
        <div className="flex flex-col gap-12">
            <section className="rounded-2xl bg-brand-700 px-8 py-14 text-white">
                <h1 className="text-4xl font-bold">Velkommen til Mini-Kvark</h1>
                <p className="mt-3 max-w-xl text-lg text-brand-100">
                    Her finner du arrangementer og grupper i linjeforeningen. Siden er laget for at du skal
                    bygge videre på den.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        to="/arrangementer"
                        className="rounded-md bg-white px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50"
                    >
                        Se arrangementer
                    </Link>
                    <Link
                        to="/grupper"
                        className="rounded-md border border-white/40 px-4 py-2 font-semibold hover:bg-white/10"
                    >
                        Se grupper
                    </Link>
                </div>
            </section>

            <section>
                <div className="mb-4 flex items-end justify-between">
                    <h2 className="text-2xl font-bold">Neste arrangementer</h2>
                    <Link to="/arrangementer" className="text-sm font-medium text-brand-700 hover:underline">
                        Se alle {events.length}
                    </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {nextEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold">Bli med i en gruppe</h2>
                <p className="mt-2 text-slate-600">
                    Linjeforeningen har {groups.length} grupper. Finn en som passer deg.
                </p>
                <Link to="/grupper" className="mt-4 inline-block font-medium text-brand-700 hover:underline">
                    Gå til gruppeoversikten
                </Link>
            </section>
        </div>
    );
}
