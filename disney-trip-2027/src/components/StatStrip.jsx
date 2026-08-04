import { SectionHead } from './Bits.jsx';
import { useKVTab } from '../lib/sheet.js';
import { GIDS } from '../config/gids.js';

const DEFAULTS = {
  students: '—',
  chaperones: '—',
  buses: '—',
  flights: '—',
  rooms: '—',
  nurses: '2',
};

export default function StatStrip() {
  const { values } = useKVTab(GIDS.tripInfo, DEFAULTS);

  const stats = [
    [values.students, 'Students'],
    [values.chaperones, 'Chaperones'],
    [values.buses, 'Buses'],
    [values.flights, 'Flights'],
    [values.rooms, 'Rooms'],
    [values.nurses, 'Nurses'],
  ];

  return (
    <section className="section" style={{ paddingTop: 44, paddingBottom: 44 }}>
      <div className="wrap">
        <SectionHead kicker="This Year" title="Disney By the Numbers" />
        <div className="stat-strip">
          {stats.map(([num, label]) => (
            <div className="stat" key={label}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
