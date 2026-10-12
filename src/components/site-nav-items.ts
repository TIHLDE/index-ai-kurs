export type InternalLink = {
    kind: "internal";
    label: string;
    to: string;
    description?: string;
};

export type ExternalLink = {
    kind: "external";
    label: string;
    href: string;
    description?: string;
    sameTab?: boolean;
};

export type NavLink = InternalLink | ExternalLink;

export type NavGroup = {
    kind: "group";
    label: string;
    items: NavLink[];
};

export type NavItem = NavLink | NavGroup;

export const navItems: NavItem[] = [
    {
        kind: "group",
        label: "Generelt",
        items: [
            {
                kind: "internal",
                label: "Gruppeoversikt",
                to: "/grupper",
                description: "Få oversikt over alle verv og grupper",
            },
            {
                kind: "external",
                label: "Fondet",
                href: "https://fondet.tihlde.org",
                description: "Se hvordan det ligger an med fondet vårt",
            },
        ],
    },
    { kind: "internal", label: "Arrangementer", to: "/arrangementer" },
    { kind: "external", label: "Wiki", href: "https://wiki.tihlde.org", sameTab: true },
];
