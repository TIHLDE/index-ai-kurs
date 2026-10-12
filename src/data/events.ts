export type EventCategory = "sosialt" | "kurs" | "bedpres" | "aktivitet";

export type Event = {
    id: string;
    title: string;
    category: EventCategory;
    start: string;
    end: string;
    location: string;
    organizer: string;
    capacity: number;
    registered: number;
    description: string;
    image?: string;
};

function daysFromNow(days: number, time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
}

export const events: Event[] = [
    {
        id: "ai-kurs",
        title: "Kurs: Kod med AI",
        category: "kurs",
        start: daysFromNow(1, "17:15"),
        end: daysFromNow(1, "18:45"),
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
        category: "aktivitet",
        start: daysFromNow(3, "18:00"),
        end: daysFromNow(3, "22:00"),
        location: "Kontoret",
        organizer: "Brettspillgruppa",
        capacity: 24,
        registered: 11,
        description: "Ta med et spill du liker, eller prøv et nytt. Vi stiller med snacks og brus.",
    },
    {
        id: "bedpres-nordlys",
        title: "Bedpres med Nordlys Konsulent",
        category: "bedpres",
        start: daysFromNow(5, "16:15"),
        end: daysFromNow(5, "19:00"),
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
        category: "kurs",
        start: daysFromNow(8, "17:15"),
        end: daysFromNow(8, "19:00"),
        location: "Realfagbygget, R9",
        organizer: "Index",
        capacity: 40,
        registered: 17,
        description: "Lær branch, commit og pull request fra bunnen av. Du trenger bare en PC.",
    },
    {
        id: "fjelltur",
        title: "Topptur til Storheia",
        category: "aktivitet",
        start: daysFromNow(12, "10:00"),
        end: daysFromNow(12, "16:00"),
        location: "Oppmøte ved Gløshaugen",
        organizer: "Turgruppa",
        capacity: 20,
        registered: 8,
        description: "En rolig tur for alle nivåer. Ta med matpakke, varme klær og godt humør.",
    },
    {
        id: "quiz",
        title: "Quiz på kjelleren",
        category: "sosialt",
        start: daysFromNow(15, "19:00"),
        end: daysFromNow(15, "22:00"),
        location: "Kjelleren",
        organizer: "Sosialen",
        capacity: 80,
        registered: 46,
        description: "Lag på opptil fem personer. Premie til vinnerlaget og til det beste lagnavnet.",
    },
    {
        id: "bedpres-fjordbank",
        title: "Bedpres med Fjordbanken",
        category: "bedpres",
        start: daysFromNow(20, "16:15"),
        end: daysFromNow(20, "19:00"),
        location: "Elektrobygget, EL3",
        organizer: "Næringsliv og Kurs",
        capacity: 50,
        registered: 31,
        description: "Fjordbanken viser hvordan de bygger nettbanken sin. Det blir pizza etterpå.",
    },
    {
        id: "lopetur",
        title: "Fellesløp langs Nidelva",
        category: "aktivitet",
        start: daysFromNow(22, "17:00"),
        end: daysFromNow(22, "18:00"),
        location: "Oppmøte ved Gløshaugen",
        organizer: "Løpegruppa",
        capacity: 30,
        registered: 9,
        description: "Seks kilometer i rolig tempo. Alle henger med, og vi avslutter med kakao.",
    },
    {
        id: "julebord",
        title: "Julebord",
        category: "sosialt",
        start: daysFromNow(40, "18:30"),
        end: daysFromNow(41, "01:00"),
        location: "Festsalen",
        organizer: "Sosialen",
        capacity: 120,
        registered: 97,
        description: "Årets store fest med treretters middag, taler og dans. Pent antrekk.",
    },
    {
        id: "immatrikuleringsfest",
        title: "Immatrikuleringsfest",
        category: "sosialt",
        start: daysFromNow(-30, "19:00"),
        end: daysFromNow(-30, "23:30"),
        location: "Festsalen",
        organizer: "Sosialen",
        capacity: 150,
        registered: 150,
        description: "Vi feiret de nye studentene med middag og fest.",
    },
    {
        id: "bedpres-havbris",
        title: "Bedpres med Havbris Teknologi",
        category: "bedpres",
        start: daysFromNow(-12, "16:15"),
        end: daysFromNow(-12, "19:00"),
        location: "Elektrobygget, EL5",
        organizer: "Næringsliv og Kurs",
        capacity: 50,
        registered: 44,
        description: "Havbris Teknologi fortalte om hvordan de lager programvare for havbruk.",
    },
];
