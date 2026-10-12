# Mini-Kvark

A small practice site for Index's course on coding with AI. The site looks like Kvark, the TIHLDE website (tihlde.org), and uses the same components and the same theme. It has no backend. The course participants are beginners and build on the site with your help.

## Commands

- `bun install` installs dependencies
- `bun dev` starts the site on http://localhost:5173
- `bun run check` runs typecheck, lint, tests and build

## Structure

- `src/pages/` has one file per page: front page, events, a single event and groups
- `src/components/` has parts used on several pages, such as the header, footer and event card
- `src/components/ui/` has the base components from Kvark: button, card, tabs, drawer and so on
- `src/data/` has all the content. There is no database or API
- `src/lib/` has small helper functions
- `src/styles.css` has the theme: colours, light and dark mode, and animations
- `src/App.tsx` has all the routes
- `src/App.test.tsx` has the tests
- Import with `#/`, which points to `src/`. Example: `import { Button } from "#/components/ui/button"`

## Rules

- All text shown on the site must be in Norwegian bokmål. Names in the code, comments and commit messages are in English.
- Write to the participant in Norwegian unless they write to you in another language.
- The site must look like Kvark. Use the components in `src/components/ui/` before building something new, and look at how the other pages are built.
- Use Tailwind classes for all styling, and only the theme colours: `bg-background`, `bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `bg-primary` and so on. Never fixed colours like `bg-blue-500`. That keeps both light and dark mode working.
- Do not change the files in `src/components/ui/` or `src/styles.css` without asking first.
- Do not add new packages without asking first.
- Only do what you are asked to do. Do not tidy up or rewrite other code at the same time.
- Make a short plan and wait for an answer before a change that touches more than one file.
- Write a test in `src/App.test.tsx` when you add something new that the user can see or click.
- Run `bun run check` before you say you are done, and fix whatever fails.
- Do not write comments in the code unless they explain why something unusual is done.
- Only use made-up names in the content. Never real people.
- Explain your changes in simple words. The person you are helping may be completely new to coding.

## Git

- Never work directly on `main` or on a `deltaker/` branch. Create a separate branch for each change.
- Do not push, open a PR or merge unless you are asked to.
- A PR must target the participant's own `deltaker/<username>` branch, never `main`.

## Your own rules

Add your own rules below.
