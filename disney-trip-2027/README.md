# Class of 2027 Disney Trip Site

A standalone site for the Class of 2027 Senior Class Trip (Feb 28 – Mar 5, 2027).
Content that isn't finalized yet (chaperones, flights, important dates, the
daily schedule, and headcounts) pulls live from your published Google Sheet —
edit the sheet, refresh the page, done. Everything else (resort info, packing
guidelines, app instructions, health office policy) is written directly into
the site since it barely changes year to year.

The sheet is already wired up — `src/config/sheet.js` has the published CSV
URL and `src/config/gids.js` has all five tab GIDs filled in. You shouldn't
need to touch either file unless you republish the sheet at a new URL.

## 1. Try it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. It reads live from your published sheet,
so whatever's in the sheet right now is what you'll see. Any tab that's
still empty just shows a "coming soon" placeholder — that's expected.

## 2. The Google Sheet

Five tabs, already published to the web (that's what makes the direct fetch
possible — no server-side proxy or API key needed):

| Tab | Columns |
|---|---|
| `tripInfo` | `key`, `value` — one fact per row |
| `importantDates` | `date`, `label`, `description` |
| `flights` | `flight`, `airport`, `checkIn`, `departure`, `arrival`, `flightNumber` |
| `chaperones` | `name` |
| `itinerary` | `date` (YYYY-MM-DD, between 2027-02-28 and 2027-03-05), `title`, `steps` |

`steps` format: semicolon-separated items, each optionally starting with
`time - `:

```
7:30am - Wake up; 9:00am - Leave rooms for park necessities; 3:00pm - Return to hotel for check-in; 5:30pm - Leave for parks; 11:00pm - Curfew
```

**If you ever add a new tab or move one:** File → Share → Publish to web (the
whole sheet, format CSV) to get the base URL, and grab each tab's GID from
its URL (`...#gid=123456`). Update `src/config/sheet.js` and
`src/config/gids.js` respectively.

**If you republish and get a new URL entirely** (rare — publishing again
normally keeps the same URL), update `PUBLISHED_CSV_BASE` in
`src/config/sheet.js`.

## 3. Deploy to Vercel

Same pattern as the Student Life site:

1. Push this folder to a new GitHub repo (e.g. `disney-trip-2027`) under your
   `TheWug33` account.
2. In Vercel, **Add New Project → Import** that repo. Vercel auto-detects
   Vite — no config changes needed, and no environment variables either.
3. Deploy. Every future commit to `main` redeploys automatically, same as
   your other site.

Because the sheet is published (public, read-only), the site fetches it
straight from the browser — nothing server-side to configure.

## 4. Updating content later

- **Chaperones, flights, dates, daily schedule, headcounts** → edit the
  Google Sheet directly. Changes show up on next page load — no redeploy
  needed.
- **Everything else** (resort description, packing tiers, app instructions,
  health office policy, trip dates themselves) → edit the matching component
  in `src/components/` and push to GitHub; Vercel redeploys automatically.

## Project structure

```
src/config/sheet.js      Published sheet's base CSV URL
src/config/gids.js       Tab GIDs
src/lib/sheet.js          CSV fetch + parse helpers
src/components/           One file per section of the page
src/App.jsx               Assembles the sections in order
src/index.css             All design tokens and styles
```
