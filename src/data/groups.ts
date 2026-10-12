export type GroupType = "board" | "subgroup" | "committee" | "interestgroup";

export type Group = {
    id: string;
    name: string;
    type: GroupType;
    email?: string;
    logoUrl?: string;
};

export const groupSections: { type: GroupType; label: string }[] = [
    { type: "board", label: "Hovedorgan" },
    { type: "subgroup", label: "Undergrupper" },
    { type: "committee", label: "Komitéer" },
    { type: "interestgroup", label: "Interessegrupper" },
];

export const groups: Group[] = [
    { id: "hovedstyret", name: "Hovedstyret", type: "board", email: "styret@example.org" },
    { id: "index", name: "Index", type: "subgroup", email: "index@example.org" },
    { id: "sosialen", name: "Sosialen", type: "subgroup", email: "sosialen@example.org" },
    {
        id: "naeringsliv-og-kurs",
        name: "Næringsliv og Kurs",
        type: "subgroup",
        email: "naeringsliv@example.org",
    },
    { id: "promo", name: "Promo", type: "subgroup", email: "promo@example.org" },
    { id: "fadderkomiteen", name: "Fadderkomiteen", type: "committee", email: "fadder@example.org" },
    { id: "jubileumskomiteen", name: "Jubileumskomiteen", type: "committee", email: "jubileum@example.org" },
    { id: "turgruppa", name: "Turgruppa", type: "interestgroup" },
    { id: "brettspillgruppa", name: "Brettspillgruppa", type: "interestgroup" },
    { id: "lopegruppa", name: "Løpegruppa", type: "interestgroup" },
];
