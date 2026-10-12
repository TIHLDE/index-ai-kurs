/**
 * The categories an event can have. The lists feed both the tabs and the
 * category filter on the events page, so an event can never end up in a
 * category nobody can filter on.
 */
export type EventCategoryOption = { value: string; label: string };

export const EVENT_CATEGORIES: EventCategoryOption[] = [
    { value: "bedpres", label: "Bedpres" },
    { value: "sosialt", label: "Sosialt" },
    { value: "kurs", label: "Kurs" },
    { value: "fadderuka", label: "Fadderuka" },
    { value: "annet", label: "Annet" },
];

export const ACTIVITY_CATEGORIES: EventCategoryOption[] = [
    { value: "aktivitet", label: "Aktivitet" },
];

/**
 * Bedpres has its own tab on the events page. The category is also part of
 * `EVENT_CATEGORIES`, so company presentations still show up under
 * "Arrangementer". The tab is a shortcut, not a separate category space.
 */
export const BEDPRES_CATEGORIES: EventCategoryOption[] =
    EVENT_CATEGORIES.filter((category) => category.value === "bedpres");

/** Every category that exists, across both tabs. */
export const ALL_EVENT_CATEGORIES: EventCategoryOption[] = [
    ...EVENT_CATEGORIES,
    ...ACTIVITY_CATEGORIES,
];
