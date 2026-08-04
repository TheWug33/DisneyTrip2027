import { SectionHead } from './Bits.jsx';

export default function Stay() {
  return (
    <section className="section section-alt" id="stay">
      <div className="wrap">
        <SectionHead
          kicker="Where We're Staying"
          title="Disney's Pop Century Resort"
          desc="A value resort themed around the decades of the 20th century, with giant pop-culture icons throughout the grounds — the same resort the trip has used in past years."
        />

        <div className="two-col">
          <div className="card">
            <div className="card-icon">🚡</div>
            <h3>Disney Skyliner</h3>
            <ul>
              <li>Free to ride — station is a short walk from the resort</li>
              <li>Runs roughly 8:00am until an hour past park close</li>
              <li>Gondolas hold up to 10 guests</li>
              <li>Direct or connecting service to EPCOT and Hollywood Studios</li>
            </ul>
          </div>
          <div className="card">
            <div className="card-icon">🚌</div>
            <h3>Disney Buses</h3>
            <ul>
              <li>Free to ride — pickup right outside the resort's main entrance</li>
              <li>Service to Magic Kingdom, Animal Kingdom, and Disney Springs</li>
              <li>Buses run continuously throughout operating hours</li>
              <li>Allow extra time during park opening/closing rushes</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
