import { useState } from "react";
import { Link, useParams } from "react-router";
import { events } from "../data/events";
import { formatEventDate } from "../lib/date";
import { spotsLeft } from "../lib/events";
import { NotFoundPage } from "./NotFoundPage";

export function EventDetailPage() {
    const { eventId } = useParams();
    const [isRegistered, setIsRegistered] = useState(false);
    const event = events.find((candidate) => candidate.id === eventId);

    if (!event) {
        return <NotFoundPage />;
    }

    const spots = spotsLeft(event) - (isRegistered ? 1 : 0);
    const isFull = spotsLeft(event) === 0;

    return (
        <div className="flex flex-col gap-6">
            <Link to="/arrangementer" className="text-sm font-medium text-brand-700 hover:underline">
                Tilbake til arrangementer
            </Link>
            <div>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                    {event.category}
                </span>
                <h1 className="mt-3 text-3xl font-bold">{event.title}</h1>
            </div>
            <dl className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
                <div>
                    <dt className="text-sm text-slate-500">Når</dt>
                    <dd className="font-medium">{formatEventDate(event.start)}</dd>
                </div>
                <div>
                    <dt className="text-sm text-slate-500">Hvor</dt>
                    <dd className="font-medium">{event.location}</dd>
                </div>
                <div>
                    <dt className="text-sm text-slate-500">Arrangør</dt>
                    <dd className="font-medium">{event.organizer}</dd>
                </div>
                <div>
                    <dt className="text-sm text-slate-500">Plasser</dt>
                    <dd className="font-medium">
                        {isFull ? "Fullt" : `${spots} av ${event.capacity} ledige`}
                    </dd>
                </div>
            </dl>
            <p className="max-w-2xl text-lg text-slate-700">{event.description}</p>
            <div>
                <button
                    type="button"
                    disabled={isFull}
                    onClick={() => setIsRegistered((current) => !current)}
                    className="rounded-md bg-brand-700 px-5 py-2.5 font-semibold text-white hover:bg-brand-900 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                    {isRegistered ? "Meld meg av" : "Meld meg på"}
                </button>
                {isRegistered && <p className="mt-3 font-medium text-green-700">Du er påmeldt.</p>}
            </div>
        </div>
    );
}
