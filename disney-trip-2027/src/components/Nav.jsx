const LINKS = [
  ['#trip', 'Trip Details'],
  ['#stay', 'Resort & Getting Around'],
  ['#money', 'Money'],
  ['#dates', 'Important Dates'],
  ['#flights', 'Flights'],
  ['#packing', 'Packing'],
  ['#itinerary', 'Daily Schedule'],
  ['#app', 'Disney App'],
  ['#health', 'Health & Medication'],
  ['#chaperones', 'Chaperones'],
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">Class of <span>2027</span> &middot; Disney Trip</div>
        <div className="nav-links">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
