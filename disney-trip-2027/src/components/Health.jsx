import { SectionHead } from './Bits.jsx';

export default function Health() {
  return (
    <section className="section" id="health">
      <div className="wrap">
        <SectionHead
          kicker="From the Health Office"
          title="Medication Procedure"
          desc="Nurses travel with the group and handle all medication administration during the trip. See Important Dates above for this year's drop-off date and time."
        />

        <div className="two-col">
          <div className="card">
            <h3>How drop-off works</h3>
            <ul>
              <li>A parent or guardian drops medication off with the nurses in person</li>
              <li>Nurses administer medication as needed throughout the trip</li>
              <li>The medication bag is returned to the student before departure from Orlando</li>
            </ul>
          </div>
          <div className="card">
            <h3>Medication requirements</h3>
            <ul>
              <li>All medications, including over-the-counter, need a written doctor's order on the medication form plus a parent signature</li>
              <li>Prescription medications must be in the original pharmacy container</li>
              <li>Over-the-counter medications must be in an unopened container</li>
              <li>Self-carry items (inhalers, EpiPens) with a valid order already on file don't need a new order</li>
              <li>Standard OTC options (Benadryl, Claritin, Zyrtec, Tums, Tylenol, Advil) are available with a signed parent consent form</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
