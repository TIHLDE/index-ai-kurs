import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";

import { DetailDateRange } from "#/components/detail-date-range";
import { DetailField } from "#/components/detail-field";
import { DetailHero } from "#/components/detail-hero";
import { DetailIdentity } from "#/components/detail-identity";
import { DetailPage } from "#/components/detail-page";
import { DetailsCard } from "#/components/details-card";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Progress } from "#/components/ui/progress";
import { Separator } from "#/components/ui/separator";
import { type Event, events } from "#/data/events";
import { formatEventDate, formatEventTime } from "#/lib/date";
import { isFull, isPast } from "#/lib/events";
import { NotFoundPage } from "#/pages/NotFoundPage";

export function EventDetailPage() {
    const { eventId } = useParams();
    const event = events.find((candidate) => candidate.id === eventId);

    if (!event) {
        return <NotFoundPage />;
    }

    return (
        <DetailPage
            back={
                <div>
                    <Button variant="ghost" size="sm" render={<Link to="/arrangementer" />}>
                        <ArrowLeft />
                        Alle arrangementer
                    </Button>
                </div>
            }
            hero={<DetailHero imageUrl={event.image} />}
            header={
                <>
                    <DetailIdentity name={event.organizer} />
                    <h1 className="text-3xl md:text-4xl">{event.title}</h1>
                    <div className="hidden flex-wrap items-center gap-x-4 gap-y-2 lg:flex">
                        <DetailField
                            icon={CalendarDays}
                            value={`${formatEventDate(event.start)}, kl. ${formatEventTime(event.start)}`}
                        />
                        <DetailField icon={MapPin} value={event.location} />
                    </div>
                </>
            }
            body={
                <>
                    <Separator />
                    <div className="prose max-w-none">
                        <p>{event.description}</p>
                    </div>
                </>
            }
            sidebar={
                <>
                    <DetailsCard
                        title="Detaljer"
                        items={[
                            <DetailDateRange
                                start={{
                                    date: formatEventDate(event.start),
                                    time: formatEventTime(event.start),
                                }}
                                end={{
                                    date: formatEventDate(event.end),
                                    time: formatEventTime(event.end),
                                }}
                            />,
                            <DetailField icon={MapPin} value={event.location} />,
                        ]}
                    />
                    <RegistrationCard event={event} />
                </>
            }
        />
    );
}

function RegistrationCard({ event }: { event: Event }) {
    const [isRegistered, setIsRegistered] = useState(false);
    const registeredCount = event.registered + (isRegistered ? 1 : 0);
    const isClosed = isPast(event);
    const cannotRegister = isClosed || (isFull(event) && !isRegistered);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Påmelding</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="size-4 text-muted-foreground" />
                        <span className="tabular-nums">
                            {registeredCount}/{event.capacity} påmeldte
                        </span>
                    </div>
                    <Progress value={(registeredCount / event.capacity) * 100} />
                </div>
                {isRegistered ? <p className="text-sm">Du er påmeldt.</p> : null}
                {isClosed ? (
                    <p className="text-sm text-muted-foreground">Påmelding er stengt</p>
                ) : isFull(event) && !isRegistered ? (
                    <p className="text-sm text-muted-foreground">Arrangementet er fullt</p>
                ) : null}
                <Button
                    className="w-full"
                    variant={isRegistered ? "outline" : "default"}
                    disabled={cannotRegister}
                    onClick={() => setIsRegistered((current) => !current)}
                >
                    {isRegistered ? "Meld deg av" : "Meld deg på"}
                </Button>
            </CardContent>
        </Card>
    );
}
