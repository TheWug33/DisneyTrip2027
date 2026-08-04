import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import StatStrip from './components/StatStrip.jsx';
import TripDetails from './components/TripDetails.jsx';
import Stay from './components/Stay.jsx';
import Money from './components/Money.jsx';
import ImportantDates from './components/ImportantDates.jsx';
import Flights from './components/Flights.jsx';
import Packing from './components/Packing.jsx';
import Itinerary from './components/Itinerary.jsx';
import DisneyApp from './components/DisneyApp.jsx';
import Health from './components/Health.jsx';
import Chaperones from './components/Chaperones.jsx';
import Footer, { PullQuote } from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <StatStrip />
      <TripDetails />
      <Stay />
      <Money />
      <ImportantDates />
      <Flights />
      <Packing />
      <Itinerary />
      <DisneyApp />
      <Health />
      <Chaperones />
      <PullQuote />
      <Footer />
    </>
  );
}
