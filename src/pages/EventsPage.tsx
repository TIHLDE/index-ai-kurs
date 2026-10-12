import { useMemo, useState } from "react";

import { EventCard } from "#/components/event-card";
import {
    type Category,
    DEFAULT_EVENT_FILTERS,
    EventFilters,
    type EventFiltersValue,
} from "#/components/event-filters";
import { PageHeader } from "#/components/page-header";
import { Stagger } from "#/components/ui/motion";
import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { events } from "#/data/events";
import { ACTIVITY_CATEGORIES, BEDPRES_CATEGORIES, EVENT_CATEGORIES } from "#/lib/event-categories";
import { isFull, isPast, sortByStart } from "#/lib/events";

const ALL_CATEGORIES = { value: "all", label: "Alle kategorier" };

type EventTab = "arrangementer" | "aktiviteter" | "bedpres";

const TABS: { value: EventTab; label: string; categories: Category[] }[] = [
    { value: "arrangementer", label: "Arrangementer", categories: EVENT_CATEGORIES },
    { value: "aktiviteter", label: "Aktiviteter", categories: ACTIVITY_CATEGORIES },
    { value: "bedpres", label: "Bedpres", categories: BEDPRES_CATEGORIES },
];

export function EventsPage() {
    const [tab, setTab] = useState<EventTab>("arrangementer");
    const [filters, setFilters] = useState<EventFiltersValue>(DEFAULT_EVENT_FILTERS);

    const tabCategories = TABS.find((t) => t.value === tab)?.categories ?? [];
    const categories = useMemo(() => [ALL_CATEGORIES, ...tabCategories], [tabCategories]);

    const changeTab = (next: EventTab) => {
        setTab(next);
        setFilters((current) => ({ ...current, category: ALL_CATEGORIES.value }));
    };

    const visibleEvents = useMemo(() => {
        const allowedCategories =
            filters.category === ALL_CATEGORIES.value
                ? tabCategories.map((category) => category.value)
                : [filters.category];
        const query = filters.query.trim().toLowerCase();

        const matching = events.filter(
            (event) =>
                allowedCategories.includes(event.category) &&
                isPast(event) === filters.showPast &&
                (!filters.openRegistration || !isFull(event)) &&
                event.title.toLowerCase().includes(query),
        );

        const sorted = sortByStart(matching);
        return filters.showPast ? sorted.reverse() : sorted;
    }, [filters, tabCategories]);

    return (
        <div className="container mx-auto flex w-full flex-col gap-6 px-4 py-8">
            <PageHeader title="Arrangementer" description="Finn kommende arrangementer" />

            <div className="grid gap-6 md:grid-cols-[20rem_minmax(0,1fr)]">
                <aside>
                    <EventFilters value={filters} categories={categories} onChange={setFilters} />
                </aside>

                <section className="flex min-w-0 flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <Tabs value={tab} onValueChange={(next) => changeTab(next as EventTab)}>
                            <TabsList>
                                {TABS.map((t) => (
                                    <TabsTrigger key={t.value} value={t.value}>
                                        {t.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                    {visibleEvents.length === 0 ? (
                        <p className="py-8 text-center text-muted-foreground">Ingen arrangementer å vise.</p>
                    ) : (
                        <Stagger render={<ul className="flex flex-col" />}>
                            {visibleEvents.map((event) => (
                                <li key={event.id}>
                                    <EventCard event={event} />
                                </li>
                            ))}
                        </Stagger>
                    )}
                </section>
            </div>
        </div>
    );
}
