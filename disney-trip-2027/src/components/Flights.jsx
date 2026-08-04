import { SectionHead, EmptyNote } from './Bits.jsx';
import { useSheetTab } from '../lib/sheet.js';
import { GIDS } from '../config/gids.js';

export default function Flights() {
  const { rows } = useSheetTab(GIDS.flights, []);

  return (
    <section className="section" id="flights">
      <div className="wrap">
        <SectionHead
          kicker="Getting to Orlando"
          title="Flight Details"
          desc="Flight groups, check-in times, and departure/arrival times, once assignments are finalized."
        />

        {rows.length === 0 ? (
          <EmptyNote>
            Flight groups and times haven't been assigned yet. Check back closer to the trip —
            this table fills in automatically once flights are booked.
          </EmptyNote>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Airport</th>
                  <th>OBHS Check-In</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Flight #</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r.flight}</td>
                    <td>{r.airport}</td>
                    <td>{r.checkIn}</td>
                    <td>{r.departure}</td>
                    <td>{r.arrival}</td>
                    <td>{r.flightNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="card" style={{ marginTop: 18 }}>
          <h3>Before you fly</h3>
          <ul>
            <li>Wear your Disney trip t-shirt to the airport and for the group photo</li>
            <li>Bring the same license, passport, or Real ID you provided to the school</li>
            <li>Visit <a href="https://www.tsa.gov" target="_blank" rel="noreferrer">tsa.gov</a> for current carry-on and security guidance</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
