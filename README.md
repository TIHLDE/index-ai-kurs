# Mini-Kvark

En liten øvingsside for Index sitt kurs i å kode med AI. Den ser ut som [tihlde.org](https://tihlde.org) og er bygget med de samme delene, men har bare en forside, arrangementer og en gruppeoversikt. Arrangementene og gruppene er oppdiktet.

Du skal bygge videre på siden med hjelp fra en AI. Målet er at du merger minst én endring i kveld. Klarer du tre, er du god.

Én regel gjelder hele veien: **AI-en skriver koden, men du eier den.** Du skal kunne forklare alt du merger.

## Før du starter

Du trenger dette på maskinen:

- VS Code og Git
- [Bun](https://bun.sh)
- En AI som kan jobbe i koden din. Har du ingen, bruk GitHub Copilot i VS Code. Den er gratis.

Installer Bun på Mac eller Linux:

```bash
curl -fsSL https://bun.sh/install | bash
```

Installer Bun på Windows, i PowerShell:

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Sett opp Copilot:

1. Åpne VS Code og installer utvidelsen «GitHub Copilot Chat».
2. Logg inn med GitHub-kontoen din.
3. Åpne chatten og velg **Agent** i menyen nederst i chatfeltet. Da kan den lese filer og endre kode selv.

Er du student, kan du søke om mer bruk på [education.github.com](https://education.github.com). Det kan ta noen dager, så du trenger det ikke i kveld.

## Få siden opp

```bash
git clone https://github.com/TIHLDE/index-ai-kurs.git
```

```bash
cd index-ai-kurs
```

```bash
bun install
```

```bash
bun dev
```

Åpne http://localhost:5173 i nettleseren. Ser du TIHLDE-logoen og en liste med arrangementer, er du klar.

## Lag din egen hovedbranch

Alle deler samme repo, så du får din egen versjon av siden. Bytt ut `brukernavn` med GitHub-navnet ditt.

```bash
git switch -c deltaker/brukernavn
```

```bash
git push -u origin deltaker/brukernavn
```

Dette er din `main` i kveld. Ingen rører den ekte `main`.

## Slik jobber du

Gjør stegene under én gang for hver ting du vil lage.

### 1. Velg hva du skal lage

Velg noe fra [menyen](#meny) lenger ned, eller finn på noe selv. Velg noe lite først, for eksempel en av feilene.

### 2. Sett rammene

Åpne `AGENTS.md`. Den forteller AI-en hva prosjektet er og hvilke regler som gjelder. AI-en leser den hver gang.

Første gang: skriv én egen regel nederst i filen. For eksempel «Bruk alltid emoji i knapper» eller «Spør meg før du lager en ny fil». Se om AI-en følger den.

### 3. Lag en branch

Lag en ny branch for hver ting du lager. Gi den et kort navn som sier hva den gjør.

```bash
git switch deltaker/brukernavn
```

```bash
git switch -c brukernavn/sok-i-grupper
```

### 4. Skriv prompten

Be først om forklaring og plan. Be så om kode.

En dårlig prompt:

> Fiks gruppesiden.

En god prompt:

> Jeg vil ha et søkefelt øverst i gruppeoversikten. Når jeg skriver, skal siden bare vise grupper der navnet inneholder teksten. Les `src/pages/GroupsPage.tsx` først. Lag en kort plan og vent til jeg sier ok.

Den gode prompten sier hva du vil ha, hvor det skal være og hvordan det skal virke.

### 5. Be AI-en sjekke seg selv

Når AI-en sier den er ferdig, skriv:

> Verifiser at alle endringene er logisk korrekte. Kjør `bun run check` og fiks det som feiler.

### 6. Sjekk selv

- Åpne siden i nettleseren og prøv det du har laget. Prøv også å gjøre noe rart, som å søke på noe som ikke finnes.
- Åpne fanen for kildekontroll i VS Code og les hver endring.
- Forstår du ikke en linje? Spør AI-en: «Forklar denne linja som om jeg aldri har kodet før.»
- Har AI-en endret noe du ikke ba om? Be den ta det bort.

### 7. Lag en PR

```bash
git add .
```

```bash
git commit -m "Legg til søk i gruppeoversikten"
```

```bash
git push -u origin brukernavn/sok-i-grupper
```

Åpne repoet på GitHub og trykk på «Compare & pull request».

**Viktig:** GitHub foreslår `main` som mål. Bytt «base» til `deltaker/brukernavn` før du oppretter PR-en.

Fyll ut malen med dine egne ord.

### 8. Få tilbakemelding

- Vent på den automatiske sjekken. Grønn hake betyr at koden bygger og testene går gjennom. Rød betyr at noe må fikses.
- Forklar endringen til sidemannen. Hva gjør den, og hvilke filer er endret?
- En av kurslederne ser kanskje gjennom PR-en din. Svar på kommentarene, eller be AI-en rette det de peker på.

### 9. Se gjennom PR-en selv

Åpne fanen «Files changed» på GitHub og les gjennom alt én gang til. Kryss av sjekklista.

### 10. Merge

Er haken grønn og sjekklista ferdig, trykker du «Merge pull request».

Hent så endringen til maskinen din før du starter på neste ting:

```bash
git switch deltaker/brukernavn
```

```bash
git pull
```

I Index går en merge til `main` rett ut til alle brukerne. Da må du også sjekke at det virker på den ekte siden etterpå. Mini-Kvark har ingen ekte side, så her stopper du ved merge.

## Meny

### Feil som må fikses

Noen har rotet til siden. Disse er fine å starte med.

- Logoen midt på forsiden er altfor stor. Den skal være omtrent en tredel så høy
- Knappene «Se arrangementer» og «Gruppeoversikt» på forsiden gjør ingenting når du trykker på dem
- Arrangementene i lista er ujevne. Bildene har ulik størrelse, og lange titler stikker ut av kortet
- Logoen i arrangementsbildene står skjevt og blir kuttet
- Bunnteksten ser rar ut på mobil. Alt er presset sammen i tre smale spalter

### Lett

- Bytt teksten og knappene øverst på forsiden
- Legg til en ny gruppe i gruppeoversikten
- Legg til et nytt arrangement
- Vis antall påmeldte på arrangementene i lista

### Middels

- Søkefelt i gruppeoversikten
- Nedtelling til neste arrangement på forsiden
- En knapp som kopierer lenken til arrangementet
- En knapp på forsiden som viser alle arrangementene, ikke bare de seks første
- Vis hvor mange ledige plasser som er igjen på arrangementssiden

### Vanskelig

- Marker arrangementer som favoritter, og husk dem når siden lastes på nytt
- Husk påmeldingen når siden lastes på nytt
- En egen side for hver gruppe, med arrangementene gruppa står bak
- Kalendervisning av arrangementene, slik tihlde.org har
- Nyheter på forsiden, slik tihlde.org har

### Fritt

Har du en egen idé? Kjør på, så lenge den kan vises på siden. Trenger du inspirasjon, se hva tihlde.org har som Mini-Kvark mangler.

## Prompter du kan låne

Forstå koden:

> Forklar dette prosjektet for en som aldri har sett det før. Hvilke sider finnes, og hvor kommer innholdet fra?

> Hvor i koden ville du endret teksten på forsiden? Ikke endre noe, bare vis meg.

Planlegge:

> Jeg vil lage [det du vil lage]. Lag en kort plan med hvilke filer du vil endre. Ikke skriv kode før jeg sier ok.

Bygge:

> Planen ser bra ut. Gjør steg 1 og stopp der.

Sjekke:

> Verifiser at alle endringene er logisk korrekte. Kjør `bun run check` og fiks det som feiler.

> Forklar endringene du gjorde, fil for fil, med enkle ord.

Rette:

> Du endret også [fil]. Det ba jeg ikke om. Ta det bort.

## Trygge rammer

- Push aldri til `main`.
- Lim aldri inn passord, nøkler eller ekte personopplysninger i en prompt.
- Les hva AI-en vil gjøre før du godkjenner en kommando den vil kjøre.
- Merge aldri noe du ikke kan forklare.

## Står du fast?

- Virker ikke siden lenger? Spør AI-en: «Siden virker ikke. Her er feilen: [lim inn feilen].»
- Har alt gått i surr? Kast endringene og start på nytt med `git restore .`
- Er du tom for gratis bruk hos Copilot? Sett deg sammen med sidemannen.
- Rekk opp hånda. Det er derfor vi er her.
