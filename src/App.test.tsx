import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import { events } from "./data/events";
import { groups } from "./data/groups";

function renderAt(path: string) {
    render(
        <MemoryRouter initialEntries={[path]}>
            <App />
        </MemoryRouter>,
    );
}

describe("forsiden", () => {
    it("viser velkomst og de tre neste arrangementene", () => {
        renderAt("/");

        expect(screen.getByRole("heading", { level: 1, name: "Velkommen til Mini-Kvark" })).toBeInTheDocument();
        expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
    });
});

describe("arrangementer", () => {
    it("viser alle arrangementene", () => {
        renderAt("/arrangementer");

        expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(events.length);
    });

    it("lar deg melde deg på og av et arrangement", () => {
        renderAt("/arrangementer/git-kurs");

        fireEvent.click(screen.getByRole("button", { name: "Meld meg på" }));
        expect(screen.getByText("Du er påmeldt.")).toBeInTheDocument();
        expect(screen.getByText("22 av 40 ledige")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Meld meg av" }));
        expect(screen.queryByText("Du er påmeldt.")).not.toBeInTheDocument();
    });

    it("stenger påmeldingen når arrangementet er fullt", () => {
        renderAt("/arrangementer/bedpres-nordlys");

        expect(screen.getByRole("button", { name: "Meld meg på" })).toBeDisabled();
    });
});

describe("grupper", () => {
    it("viser alle gruppene", () => {
        renderAt("/grupper");

        expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(groups.length);
    });
});

describe("ukjent adresse", () => {
    it("viser en egen side når adressen ikke finnes", () => {
        renderAt("/finnes-ikke");

        expect(screen.getByRole("heading", { name: "Fant ikke siden" })).toBeInTheDocument();
    });
});
