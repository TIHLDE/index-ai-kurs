import type { ReactNode } from "react";
import { Link } from "react-router";

import { EventCard } from "#/components/event-card";
import { HeroSectionBackground } from "#/components/hero-section";
import { TihldeLogo } from "#/components/icons/tihlde";
import { Button } from "#/components/ui/button";
import { Reveal, Stagger } from "#/components/ui/motion";
import { type Event, events } from "#/data/events";
import { upcomingEvents } from "#/lib/events";

const LIST_PREVIEW_COUNT = 6;

export function HomePage() {
    const upcoming = upcomingEvents(events);
    const eventList = upcoming.filter((event) => event.category !== "aktivitet");
    const activityList = upcoming.filter((event) => event.category === "aktivitet");

    return (
        <>
            <Hero />
            <EventSection title="Arrangementer" events={eventList} />
            <EventSection title="Aktiviteter" events={activityList} />
        </>
    );
}

function EventSection({ title, events }: { title: string; events: Event[] }) {
    return (
        <section className="container mx-auto w-full px-4 py-8">
            <SectionHeader title={title} />
            <Stagger render={<ul className="mt-4 grid gap-x-8 lg:grid-cols-2" />}>
                {events.slice(0, LIST_PREVIEW_COUNT).map((event) => (
                    <li key={event.id}>
                        <EventCard event={event} />
                    </li>
                ))}
            </Stagger>
        </section>
    );
}

function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
    return (
        <Reveal render={<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2" />}>
            <h2 className="min-w-0 text-2xl">{title}</h2>
            {action}
        </Reveal>
    );
}

function Hero() {
    return (
        <div className="relative flex min-h-[calc(100svh_-_3.5rem_-_4rem_-_env(safe-area-inset-bottom))] flex-col lg:min-h-[calc(100svh_-_3.5rem)]">
            <HeroSectionBackground className="-z-50 text-primary" />
            <Stagger
                render={
                    <section className="container mx-auto flex w-full flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center" />
                }
            >
                <div className="flex items-center" style={{ color: "var(--color-logo, currentColor)" }}>
                    <TihldeLogo variant="full" className="h-14 w-auto" />
                </div>
                <p className="max-w-2xl text-balance">
                    Linjeforeningen for Dataingeniør, Digital infrastruktur og cybersikkerhet, Digital
                    forretningsutvikling, Digital transformasjon og Informasjonsbehandling ved NTNU.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button size="lg" render={<Link to="/arrangementer" />}>
                        Se arrangementer
                    </Button>
                    <Button size="lg" variant="outline" render={<Link to="/grupper" />}>
                        Gruppeoversikt
                    </Button>
                </div>
            </Stagger>
        </div>
    );
}
