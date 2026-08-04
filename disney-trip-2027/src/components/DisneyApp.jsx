import { SectionHead } from './Bits.jsx';

const POINTS = [
  { icon: '📲', title: 'Download it today', text: 'Get the My Disney Experience app now and save your login — you\'ll use it all week long.' },
  { icon: '🍽️', title: 'Dining reservations', text: 'Make dining reservations in advance, right from the app, before you arrive.' },
  { icon: '🗓️', title: 'Manage your itinerary', text: 'Share and link your plans with friends so your group can coordinate.' },
  { icon: '🎫', title: 'Seamless entry', text: 'The app connects directly to your theme park ticket.' },
  { icon: '⚡', title: 'Lightning Lane', text: 'Use Multi Pass and Single Pass selections to skip the standby line at popular attractions.' },
  { icon: '♿', title: 'DAS support', text: 'Students who need the Disability Access Service should look into DAS registration before the trip.' },
];

export default function DisneyApp() {
  return (
    <section className="section section-alt" id="app">
      <div className="wrap">
        <SectionHead
          kicker="Your Trip Command Center"
          title="My Disney Experience App"
          desc="This app runs your whole day at the parks — get it set up before you leave."
        />
        <div className="grid grid-3">
          {POINTS.map((p) => (
            <div className="card" key={p.title}>
              <div className="card-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
