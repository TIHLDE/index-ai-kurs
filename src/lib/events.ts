import type { Event } from "../data/events";

export function sortByStart(events: Event[]) {
    return [...events].sort((a, b) => a.start.localeCompare(b.start));
}

export function spotsLeft(event: Event) {
    return Math.max(event.capacity - event.registered, 0);
}
