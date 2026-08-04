import { SectionHead, EmptyNote } from './Bits.jsx';
import { useSheetTab } from '../lib/sheet.js';
import { GIDS } from '../config/gids.js';

export default function Chaperones() {
  const { rows } = useSheetTab(GIDS.chaperones, []);

  return (
    <section className="section section-alt" id="chaperones">
      <div className="wrap">
        <SectionHead
          kicker="Who's Coming"
          title="Meet Your Chaperones"
          desc="The staff traveling with the Class of 2027."
        />
        {rows.length === 0 ? (
          <EmptyNote>The chaperone list will be posted here once it's finalized.</EmptyNote>
        ) : (
          <div>
            {rows.map((r, i) => (
              <span className="chaperone-chip" key={i}>{r.name}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
