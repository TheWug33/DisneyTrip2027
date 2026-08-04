import { SectionHead } from './Bits.jsx';

const TIPS = [
  { icon: '💵', title: 'Daily cash', text: 'Students receive a cash food allowance each day of the trip — the exact amount is confirmed closer to departure.' },
  { icon: '🛒', title: 'Room snacks', text: 'Consider an Instacart order for a case of water and room snacks, or pack snacks in checked luggage.' },
  { icon: '🔒', title: 'Use the room safe', text: "Don't carry a large amount of cash into the parks — leave extra in the hotel room safe." },
  { icon: '🎁', title: 'Disney gift cards', text: 'Gift cards can be added directly to the My Disney Experience app or a phone wallet for easy spending.' },
];

export default function Money() {
  return (
    <section className="section" id="money">
      <div className="wrap">
        <SectionHead
          kicker="Budgeting"
          title="Disney Financials"
          desc="A few ways to make trip spending money go further and stay secure."
        />
        <div className="grid grid-4">
          {TIPS.map((t) => (
            <div className="card" key={t.title}>
              <div className="card-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
