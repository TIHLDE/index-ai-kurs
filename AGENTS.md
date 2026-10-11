# Mini-Kvark

En liten øvingsside for Index sitt kurs i å kode med AI. Siden ligner på Kvark, nettsiden til TIHLDE, men har ingen backend. Deltakerne på kurset er nybegynnere og bygger videre på siden med hjelp fra deg.

## Kommandoer

- `bun install` installerer avhengigheter
- `bun dev` starter siden på http://localhost:5173
- `bun run check` kjører typesjekk, lint, tester og bygg

## Struktur

- `src/pages/` har én fil per side: forside, arrangementer, ett arrangement og grupper
- `src/components/` har deler som brukes på flere sider
- `src/data/` har alt innholdet. Det finnes ingen database eller API
- `src/lib/` har små hjelpefunksjoner
- `src/App.tsx` har alle rutene
- `src/App.test.tsx` har testene

## Regler

- All tekst som vises på siden skal være på norsk bokmål. Navn i koden er på engelsk.
- Bruk Tailwind-klasser til all styling. Fargene `brand-*` er definert i `src/styles.css`.
- Ikke legg til nye pakker uten å spørre først.
- Gjør bare det du blir bedt om. Ikke rydd eller skriv om annen kode samtidig.
- Lag en kort plan og vent på svar før du gjør en endring som berører mer enn én fil.
- Skriv en test i `src/App.test.tsx` når du legger til noe nytt som brukeren kan se eller trykke på.
- Kjør `bun run check` før du sier at du er ferdig, og fiks det som feiler.
- Ikke skriv kommentarer i koden med mindre de forklarer hvorfor noe uvanlig er gjort.
- Bruk bare oppdiktede navn i innholdet. Aldri ekte personer.
- Forklar endringene dine med enkle ord. Den du hjelper kan være helt ny i koding.

## Git

- Jobb aldri direkte på `main` eller på en `deltaker/`-branch. Lag en egen branch for hver endring.
- Ikke push, åpne PR eller merge uten at du blir bedt om det.
- En PR skal gå mot deltakerens egen `deltaker/<brukernavn>`-branch, aldri mot `main`.

## Dine egne regler

Legg til dine egne regler under her.
