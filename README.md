# ZimArchive

A Next.js site exploring the achievements and history of Zimbabwe's President and party, backed by Firebase (Firestore for data, no auth flow yet).

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:9002`.

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint
- `npm run typecheck` — run the TypeScript compiler with no emit

## Firebase configuration

Default Firebase project config lives in [`src/firebase/config.ts`](src/firebase/config.ts). To point the app at a different Firebase project (e.g. staging), set these env vars instead of editing the file:

- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`

Firestore security rules live in [`firestore.rules`](firestore.rules): all collections are publicly readable and writes are closed (`if false`) since the app has no authenticated admin flow. Deploy rule changes with:

```bash
firebase deploy --only firestore:rules
```

## National heroes data

Profiles in the heroes section are generated from a compiled archive rather than hand-written:

- [`src/data/heroes-archive.json`](src/data/heroes-archive.json) holds one record per hero (dates, places, roles, education, a short summary and dated events, all written in our own words from the published guide *A Guide to Heroes Acre*). A value is only filled in when the source states it. `verification.partial` marks records whose source pages were hard to read; their profile pages show a "still being reviewed" note.
- [`src/data/heroes-archive.ts`](src/data/heroes-archive.ts) types that file, and [`src/data/hero-profiles.ts`](src/data/hero-profiles.ts) turns it (plus the original hand-written profile in `heroes.ts`) into the shape the pages render, including a light index for the directory so full profiles are never sent to the browser.
- `/national-heroes` is the searchable directory and `/national-heroes/[id]` is a profile page (statically generated).

To add or correct a hero, edit `heroes-archive.json` (keep `order` and `id` unique) and the pages pick it up.
