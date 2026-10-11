import { Link } from "react-router";
import type { Event } from "../data/events";
import { formatEventDate } from "../lib/date";
import { spotsLeft } from "../lib/events";

export function EventCard({ event }: { event: Event }) {
    const spots = spotsLeft(event);

    return (
        <Link
            to={`/arrangementer/${event.id}`}
            className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-500 hover:shadow-sm"
        >
            <span className="w-fit rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                {event.category}
            </span>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-slate-600">{formatEventDate(event.start)}</p>
            <p className="text-sm text-slate-600">{event.location}</p>
            <p className="mt-auto pt-2 text-sm font-medium text-slate-700">
                {spots === 0 ? "Fullt" : `${spots} ledige plasser`}
            </p>
        </Link>
    );
}
