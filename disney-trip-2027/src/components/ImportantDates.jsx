import { SectionHead, EmptyNote } from './Bits.jsx';
import { useSheetTab } from '../lib/sheet.js';
import { GIDS } from '../config/gids.js';

export default function ImportantDates() {
  const { rows } = useSheetTab(GIDS.importantDates, []);

  return (
    <section className="section section-alt" id="dates">
      <div className="wrap">
        <SectionHead
          kicker="Mark Your Calendar"
          title="Important Dates"
          desc="Key deadlines and meetings leading up to the trip, plus departure and return day."
        />

        {rows.length === 0 ? (
          <EmptyNote>
            Meeting dates, the medication drop-off window, and departure/return days will be posted
            here once they're finalized.
          </EmptyNote>
        ) : (
          <div className="timeline">
            {rows.map((r, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-date">{r.date}</div>
                <h4>{r.label}</h4>
                {r.description && <p>{r.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
