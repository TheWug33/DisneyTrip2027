import { SectionHead } from './Bits.jsx';
import { useKVTab } from '../lib/sheet.js';
import { GIDS } from '../config/gids.js';

const DEFAULTS = {
  transportation: "Round-trip charter bus transportation between OBHS and Newark Liberty / JFK airports",
  resort: "Disney's Pop Century Resort",
  passport: 'Multi-day Disney World Park Passport with Park Hopper option',
  foodMoney: 'TBD',
};

export default function TripDetails() {
  const { values } = useKVTab(GIDS.tripInfo, DEFAULTS);

  const cards = [
    {
      icon: '🚌',
      title: 'Getting There',
      text: values.transportation,
    },
    {
      icon: '🏨',
      title: 'Where We Stay',
      text: values.resort,
    },
    {
      icon: '🎟️',
      title: 'Park Tickets',
      text: values.passport,
    },
    {
      icon: '💵',
      title: 'Food Money',
      text: values.foodMoney === 'TBD'
        ? 'Cash-per-day food allowance will be confirmed closer to the trip.'
        : values.foodMoney,
    },
  ];

  return (
    <section className="section" id="trip">
      <div className="wrap">
        <SectionHead
          kicker="The Basics"
          title="Trip Details"
          desc="The core logistics of the trip. Exact dollar amounts and pickup times are confirmed a few months out — this page updates automatically once they are."
        />
        <div className="grid grid-4">
          {cards.map((c) => (
            <div className="card" key={c.title}>
              <div className="card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
