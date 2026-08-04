import { useMemo, useState } from 'react';
import { SectionHead, EmptyNote } from './Bits.jsx';
import { useSheetTab } from '../lib/sheet.js';
import { GIDS } from '../config/gids.js';

const TRIP_START = new Date('2027-02-28T00:00:00');
const TRIP_END = new Date('2027-03-05T00:00:00');

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function niceDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function buildDayShell() {
  const days = [];
  const cur = new Date(TRIP_START);
  while (cur <= TRIP_END) {
    days.push({ iso: isoDate(cur), label: niceDate(cur) });
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

// "7:30am - Wake up; 9:00am - Leave rooms; Return for curfew ~11:00pm"
function parseSteps(raw) {
  if (!raw) return [];
  return raw
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const idx = s.indexOf(' - ');
      if (idx === -1) return { time: '', text: s };
      return { time: s.slice(0, idx).trim(), text: s.slice(idx + 3).trim() };
    });
}

export default function Itinerary() {
  const shell = useMemo(buildDayShell, []);
  const { rows } = useSheetTab(GIDS.itinerary, []);
  const [active, setActive] = useState(shell[0]?.iso);

  const byDate = {};
  rows.forEach((r) => {
    if (r.date) byDate[r.date] = r;
  });

  const activeShell = shell.find((d) => d.iso === active);
  const activeData = byDate[active];
  const steps = parseSteps(activeData?.steps);

  return (
    <section className="section" id="itinerary">
      <div className="wrap">
        <SectionHead
          kicker="Day by Day"
          title="Daily Schedule"
          desc="Wake-up times, park necessities pickup, and curfews for each day of the trip."
        />

        <div className="day-tabs">
          {shell.map((d) => (
            <button
              key={d.iso}
              className={`day-tab${d.iso === active ? ' active' : ''}`}
              onClick={() => setActive(d.iso)}
            >
              {d.label.split(',')[0]}
            </button>
          ))}
        </div>

        <div className="day-panel">
          <h3>{activeData?.title || 'Schedule to be announced'}</h3>
          <div className="day-date">{activeShell?.label}</div>

          {steps.length === 0 ? (
            <EmptyNote>
              This day's schedule hasn't been posted yet — it'll appear here once it's set.
            </EmptyNote>
          ) : (
            <ul className="day-steps">
              {steps.map((s, i) => (
                <li key={i}>
                  {s.time && <time>{s.time}</time>}
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
