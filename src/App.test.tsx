import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { App } from "#/App";
import { groups } from "#/data/groups";
import { ThemeProvider } from "#/integrations/theme";

function renderAt(path: string) {
    render(
        <ThemeProvider>
            <MemoryRouter initialEntries={[path]}>
                <App />
            </MemoryRouter>
        </ThemeProvider>,
    );
}

function eventTitles() {
    return within(screen.getByRole("main"))
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);
}

describe("forsiden", () => {
    it("viser kommende arrangementer og aktiviteter hver for seg", () => {
        renderAt("/");

        expect(screen.getByRole("heading", { level: 2, name: "Arrangementer" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 2, name: "Aktiviteter" })).toBeInTheDocument();
        expect(eventTitles()).toHaveLength(9);
        expect(eventTitles()).not.toContain("Immatrikuleringsfest");
    });

    it("har knapper som går til arrangementer og grupper", () => {
        renderAt("/");

        expect(screen.getByRole("link", { name: "Se arrangementer" })).toHaveAttribute("href", "/arrangementer");
        expect(screen.getByRole("link", { name: "Gruppeoversikt" })).toHaveAttribute("href", "/grupper");
    });
});

describe("arrangementer", () => {
    it("viser kommende arrangementer, sortert på dato", () => {
        renderAt("/arrangementer");

        expect(eventTitles()).toEqual([
            "Kurs: Kod med AI",
            "Bedpres med Nordlys Konsulent: slik er hverdagen som nyutdannet utvikler",
            "Kurs: Git for nybegynnere",
            "Quiz på kjelleren",
            "Bedpres med Fjordbanken",
            "Julebord",
        ]);
    });

    it("filtrerer på søk", () => {
        renderAt("/arrangementer");

        fireEvent.change(screen.getAllByPlaceholderText("Søk etter arrangement")[0], {
            target: { value: "git" },
        });

        expect(eventTitles()).toEqual(["Kurs: Git for nybegynnere"]);
    });

    it("viser aktiviteter i egen fane", () => {
        renderAt("/arrangementer");

        fireEvent.click(screen.getByRole("tab", { name: "Aktiviteter" }));

        expect(eventTitles()).toEqual(["Brettspillkveld", "Topptur til Storheia", "Fellesløp langs Nidelva"]);
    });

    it("viser bare tidligere arrangementer når det er valgt", () => {
        renderAt("/arrangementer");

        fireEvent.click(screen.getByRole("checkbox", { name: /Tidligere/ }));

        expect(eventTitles()).toEqual(["Bedpres med Havbris Teknologi", "Immatrikuleringsfest"]);
    });

    it("lar deg melde deg på og av et arrangement", () => {
        renderAt("/arrangementer/git-kurs");

        expect(screen.getByText("17/40 påmeldte")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Meld deg på" }));
        expect(screen.getByText("Du er påmeldt.")).toBeInTheDocument();
        expect(screen.getByText("18/40 påmeldte")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Meld deg av" }));
        expect(screen.getByText("17/40 påmeldte")).toBeInTheDocument();
    });

    it("stenger påmeldingen når arrangementet er fullt", () => {
        renderAt("/arrangementer/bedpres-nordlys");

        expect(screen.getByRole("button", { name: "Meld deg på" })).toBeDisabled();
        expect(screen.getByText("Arrangementet er fullt")).toBeInTheDocument();
    });
});

describe("grupper", () => {
    it("viser alle gruppene under riktig overskrift", () => {
        renderAt("/grupper");

        expect(screen.getByRole("heading", { level: 1, name: "Gruppeoversikt" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 2, name: "Undergrupper" })).toBeInTheDocument();
        for (const group of groups) {
            expect(screen.getByText(group.name)).toBeInTheDocument();
        }
    });
});

describe("ukjent adresse", () => {
    it("viser en egen side når adressen ikke finnes", () => {
        renderAt("/finnes-ikke");

        expect(screen.getByRole("heading", { name: "Fant ikke siden" })).toBeInTheDocument();
    });
});
