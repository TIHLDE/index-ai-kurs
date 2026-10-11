export type GroupType = "Undergruppe" | "Komité" | "Interessegruppe";

export type Group = {
    id: string;
    name: string;
    type: GroupType;
    members: number;
    description: string;
};

export const groupTypes: GroupType[] = ["Undergruppe", "Komité", "Interessegruppe"];

export const groups: Group[] = [
    {
        id: "index",
        name: "Index",
        type: "Undergruppe",
        members: 32,
        description: "Utvikler og drifter nettsiden og de andre digitale løsningene til linjeforeningen.",
    },
    {
        id: "sosialen",
        name: "Sosialen",
        type: "Undergruppe",
        members: 28,
        description: "Lager fester, quizer og andre sosiale arrangementer gjennom hele året.",
    },
    {
        id: "naeringsliv-og-kurs",
        name: "Næringsliv og Kurs",
        type: "Undergruppe",
        members: 24,
        description: "Har kontakten med bedrifter og arrangerer bedriftspresentasjoner og kurs.",
    },
    {
        id: "promo",
        name: "Promo",
        type: "Undergruppe",
        members: 19,
        description: "Lager plakater, bilder og video, og sørger for at folk får med seg det som skjer.",
    },
    {
        id: "fadderkomiteen",
        name: "Fadderkomiteen",
        type: "Komité",
        members: 14,
        description: "Planlegger fadderuka og tar imot de nye studentene hver høst.",
    },
    {
        id: "jubileumskomiteen",
        name: "Jubileumskomiteen",
        type: "Komité",
        members: 9,
        description: "Planlegger feiringen når linjeforeningen har bursdag.",
    },
    {
        id: "turgruppa",
        name: "Turgruppa",
        type: "Interessegruppe",
        members: 41,
        description: "Drar på fjellturer, hytteturer og skiturer. Alle nivåer er velkomne.",
    },
    {
        id: "brettspillgruppa",
        name: "Brettspillgruppa",
        type: "Interessegruppe",
        members: 36,
        description: "Møtes annenhver uke for å spille brettspill og kortspill.",
    },
    {
        id: "lopegruppa",
        name: "Løpegruppa",
        type: "Interessegruppe",
        members: 22,
        description: "Løper sammen to ganger i uka, og melder seg på et par løp i året.",
    },
];
