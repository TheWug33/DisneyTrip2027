import { SectionHead } from './Bits.jsx';

const TIERS = [
  { range: 'Under 40 lbs', note: "You're all set", tone: 'good' },
  { range: '41–50 lbs', note: 'Still okay, but close to the limit', tone: 'warn' },
  { range: 'Over 50 lbs', note: 'Overweight fee applies — you pay!', tone: 'bad' },
];

export default function Packing() {
  return (
    <section className="section section-alt" id="packing">
      <div className="wrap">
        <SectionHead
          kicker="Before You Leave"
          title="Checked Bag Weight Guidelines"
          desc="Each student can bring one checked bag and one carry-on. Weigh your suitcase at home before packing day."
        />
        <div className="grid grid-3">
          {TIERS.map((t) => (
            <div className="card" key={t.range}>
              <div className="card-icon">{t.tone === 'bad' ? '⚠️' : t.tone === 'warn' ? '🧳' : '✅'}</div>
              <h3>{t.range}</h3>
              <p>{t.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
