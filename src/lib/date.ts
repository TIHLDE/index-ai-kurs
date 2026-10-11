const dateFormatter = new Intl.DateTimeFormat("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
});

const timeFormatter = new Intl.DateTimeFormat("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
});

export function formatEventDate(isoDate: string) {
    const date = new Date(isoDate);
    return `${dateFormatter.format(date)} kl. ${timeFormatter.format(date)}`;
}
