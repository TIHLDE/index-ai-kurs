export type EventCategory = "Sosialt" | "Kurs" | "Bedpres" | "Aktivitet";

export type Event = {
    id: string;
    title: string;
    category: EventCategory;
    start: string;
    location: string;
    organizer: string;
    capacity: number;
    registered: number;
    description: string;
};

export const events: Event[] = [
    {
        id: "ai-kurs",
        title: "Kurs: Kod med AI",
        category: "Kurs",
        start: "2026-10-12T17:15:00",
        location: "Realfagbygget, R5",
        organizer: "Index",
        capacity: 30,
        registered: 20,
        description:
            "Vi lærer å jobbe med AI når vi koder. Først en kort gjennomgang, så bygger du videre på denne siden selv.",
    },
    {
        id: "brettspillkveld",
        title: "Brettspillkveld",
        category: "Sosialt",
        start: "2026-10-20T18:00:00",
        location: "Kontoret",
        organizer: "Brettspillgruppa",
        capacity: 24,
        registered: 11,
        description: "Ta med et spill du liker, eller prøv et nytt. Vi stiller med snacks og brus.",
    },
    {
        id: "bedpres-nordlys",
        title: "Bedpres med Nordlys Konsulent",
        category: "Bedpres",
        start: "2026-10-27T16:15:00",
        location: "Elektrobygget, EL5",
        organizer: "Næringsliv og Kurs",
        capacity: 60,
        registered: 60,
        description:
            "Nordlys Konsulent forteller om hverdagen som nyutdannet utvikler. Etterpå blir det mat og mingling.",
    },
    {
        id: "git-kurs",
        title: "Kurs: Git for nybegynnere",
        category: "Kurs",
        start: "2026-11-03T17:15:00",
        location: "Realfagbygget, R9",
        organizer: "Index",
        capacity: 40,
        registered: 17,
        description: "Lær branch, commit og pull request fra bunnen av. Du trenger bare en PC.",
    },
    {
        id: "fjelltur",
        title: "Topptur til Storheia",
        category: "Aktivitet",
        start: "2026-11-07T10:00:00",
        location: "Oppmøte ved Gløshaugen",
        organizer: "Turgruppa",
        capacity: 20,
        registered: 8,
        description: "En rolig tur for alle nivåer. Ta med matpakke, varme klær og godt humør.",
    },
    {
        id: "quiz",
        title: "Quiz på kjelleren",
        category: "Sosialt",
        start: "2026-11-12T19:00:00",
        location: "Kjelleren",
        organizer: "Sosialen",
        capacity: 80,
        registered: 46,
        description: "Lag på opptil fem personer. Premie til vinnerlaget og til det beste lagnavnet.",
    },
    {
        id: "bedpres-fjordbank",
        title: "Bedpres med Fjordbanken",
        category: "Bedpres",
        start: "2026-11-18T16:15:00",
        location: "Elektrobygget, EL3",
        organizer: "Næringsliv og Kurs",
        capacity: 50,
        registered: 31,
        description: "Fjordbanken viser hvordan de bygger nettbanken sin. Det blir pizza etterpå.",
    },
    {
        id: "julebord",
        title: "Julebord",
        category: "Sosialt",
        start: "2026-12-04T18:30:00",
        location: "Festsalen",
        organizer: "Sosialen",
        capacity: 120,
        registered: 97,
        description: "Årets store fest med treretters middag, taler og dans. Pent antrekk.",
    },
];
