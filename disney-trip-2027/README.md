# Class of 2027 Disney Trip Site

A standalone site for the Class of 2027 Senior Class Trip (Feb 28 – Mar 5, 2027).
Content that isn't finalized yet (chaperones, flights, important dates, the
daily schedule, and headcounts) pulls live from a Google Sheet you control —
edit the sheet, refresh the page, done. Everything else (resort info, packing
guidelines, app instructions, health office policy) is written directly into
the site since it barely changes year to year.

## 1. Try it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Without a connected sheet, every dynamic
section just shows its "coming soon" placeholder — that's expected.

## 2. Set up the Google Sheet

Create one new Google Sheet with these tabs. **Column headers must match
exactly** (case doesn't matter, but the words do) — the site turns each
header into a field name automatically.

### Tab: `tripInfo`
Two columns: `key`, `value`. One row per fact. Recognized keys:

| key | example value |
|---|---|
| `transportation` | Round-trip charter bus between OBHS and Newark Liberty / JFK |
| `resort` | Disney's Pop Century Resort |
| `passport` | 4-Day Disney World Park Passport with Park Hopper |
| `foodMoney` | $50 cash per day ($250 total) |
| `students` | 340 |
| `chaperones` | 34 |
| `buses` | 8 |
| `flights` | 3 |
| `rooms` | 106 |
| `nurses` | 2 |

You don't need every key — anything left out just keeps showing its default.

### Tab: `importantDates`
Columns: `date`, `label`, `description`. One row per date, in the order you
want them to appear. Example:

| date | label | description |
|---|---|---|
| Monday, Jan 25 | Final Disney Meeting | 2nd period, OBHS |
| Monday, Feb 1 | Medication Drop-Off | 5:00–7:00pm, parent/guardian must bring it in person |
| Sunday, Feb 28 | We're Off to Disney! | Report to OBHS at your assigned time |
| Friday, Mar 5 | Heading Home | Arrival time TBD |

### Tab: `flights`
Columns: `flight`, `airport`, `checkIn`, `departure`, `arrival`, `flightNumber`.
One row per flight group ("A", "B", "C"...).

### Tab: `chaperones`
One column: `name`. One row per chaperone.

### Tab: `itinerary`
Columns: `date`, `title`, `steps`.

- `date` must be in `YYYY-MM-DD` format and fall between `2027-02-28` and
  `2027-03-05` (that's how the site matches a row to the right day tab).
- `steps` is a single cell with each item separated by a semicolon, and an
  optional time before a dash:

  ```
  7:30am - Wake up; 9:00am - Leave rooms for park necessities; 3:00pm - Return to hotel for check-in; 5:30pm - Leave for parks; 11:00pm - Curfew
  ```

  A step without a leading `time -` just shows as plain text.

Once the sheet looks right: **File → Share → Publish to web** isn't required —
the site reads it through a private server-side proxy (see step 4), so the
sheet itself only needs to be shared with "Anyone with the link can view."

## 3. Get the Sheet ID and tab GIDs

- The Sheet ID is the long string in the sheet's URL:
  `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`
- For each tab's GID: click the tab, then look at the URL — the number after
  `#gid=` is that tab's GID.

Paste the GIDs into `src/config/gids.js`:

```js
export const GIDS = {
  tripInfo: '123456789',
  importantDates: '234567890',
  flights: '345678901',
  chaperones: '456789012',
  itinerary: '567890123',
};
```

## 4. Deploy to Vercel

Same pattern as the Student Life site:

1. Push this folder to a new GitHub repo (e.g. `disney-trip-2027`) under your
   `TheWug33` account.
2. In Vercel, **Add New Project → Import** that repo. Vercel auto-detects
   Vite — no config changes needed.
3. Before the first deploy, add an **Environment Variable**:
   `SHEET_ID` = the Sheet ID from step 3.
4. Deploy. Every future commit to `main` redeploys automatically, same as
   your other site.

The `/api/sheet` serverless function keeps the Sheet ID server-side and
avoids the CORS error you'd get fetching Google's CSV export straight from
the browser.

## 5. Updating content later

- **Chaperones, flights, dates, daily schedule, headcounts** → edit the
  Google Sheet directly. Changes show up on next page load (cached at the
  edge for about a minute).
- **Everything else** (resort description, packing tiers, app instructions,
  health office policy, trip dates themselves) → edit the matching component
  in `src/components/` and push to GitHub; Vercel redeploys automatically.

## Project structure

```
api/sheet.js           Serverless CSV proxy (needs SHEET_ID env var)
src/config/gids.js      Tab GIDs — the one file you'll edit most
src/lib/sheet.js         CSV fetch + parse helpers
src/components/          One file per section of the page
src/App.jsx              Assembles the sections in order
src/index.css            All design tokens and styles
```
