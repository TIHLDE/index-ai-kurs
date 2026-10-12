export { cn } from "cn";

export function truncateLabel(text: string, max = 24): string {
    return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}
