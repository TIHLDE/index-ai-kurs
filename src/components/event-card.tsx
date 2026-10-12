import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router";

import { ListCard } from "#/components/list-card";
import type { Event } from "#/data/events";
import { formatEventDateTime } from "#/lib/date";

export function EventCard({ event }: { event: Event }) {
    return (
        <ListCard
            render={<Link to={`/arrangementer/${event.id}`} />}
            title={event.title}
            imageUrl={event.image}
            imageBadge={event.organizer}
            meta={[
                { icon: CalendarDays, text: formatEventDateTime(event.start) },
                { icon: MapPin, text: event.location },
            ]}
        />
    );
}
