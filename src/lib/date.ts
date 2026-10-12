import { format } from "date-fns";
import { nb } from "date-fns/locale";

export function formatEventDate(iso: string): string {
    return format(new Date(iso), "EEE d. MMM yyyy", { locale: nb });
}

export function formatEventTime(iso: string): string {
    return format(new Date(iso), "HH:mm");
}

export function formatEventDateTime(iso: string): string {
    return `${formatEventDate(iso)}, ${formatEventTime(iso)}`;
}
