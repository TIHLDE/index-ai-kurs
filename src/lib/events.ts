import type { Event } from "#/data/events";

export function sortByStart(events: Event[]) {
    return [...events].sort((a, b) => a.start.localeCompare(b.start));
}

export function isPast(event: Event) {
    return new Date(event.end).getTime() < Date.now();
}

export function isFull(event: Event) {
    return event.registered >= event.capacity;
}

export function upcomingEvents(events: Event[]) {
    return sortByStart(events.filter((event) => !isPast(event)));
}
