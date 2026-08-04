import { useEffect, useMemo, useState } from 'react';

const TRIP_START = new Date('2027-02-28T00:00:00');
const TRIP_END = new Date('2027-03-05T23:59:59');
const SPARK_COLORS = ['var(--gold)', 'var(--pink)', 'var(--sky-blue)'];

function getRemaining() {
  const diff = TRIP_START.getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function Sparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${20 + Math.random() * 60}%`,
        size: 3 + Math.random() * 4,
        delay: `${Math.random() * 2.8}s`,
        color: SPARK_COLORS[i % SPARK_COLORS.length],
      })),
    []
  );
  return (
    <div className="sparkle-field" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 8px 2px ${s.color}`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [remaining, setRemaining] = useState(getRemaining());

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const inFlight = Date.now() >= TRIP_START.getTime() && Date.now() <= TRIP_END.getTime();
  const afterTrip = Date.now() > TRIP_END.getTime();

  return (
    <header className="hero">
      <Sparkles />
      <span className="hero-eyebrow">OBHS Senior Class Trip</span>
      <h1>
        Class of 2027 <em>&times;</em> Walt Disney World
      </h1>
      <p className="hero-sub">
        Everything you and your family need to know before, during, and after the trip —
        updated here as details are finalized throughout the year.
      </p>

      {!inFlight && !afterTrip && remaining && (
        <div className="countdown" role="timer" aria-label="Time until the trip departs">
          <div className="countdown-unit">
            <div className="countdown-num">{remaining.days}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-unit">
            <div className="countdown-num">{String(remaining.hours).padStart(2, '0')}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-unit">
            <div className="countdown-num">{String(remaining.minutes).padStart(2, '0')}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-unit">
            <div className="countdown-num">{String(remaining.seconds).padStart(2, '0')}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
      )}

      {inFlight && (
        <div className="countdown">
          <div className="countdown-unit" style={{ minWidth: 260 }}>
            <div className="countdown-num" style={{ fontSize: '1.4rem' }}>We're at Disney!</div>
            <div className="countdown-label">Have a magical trip</div>
          </div>
        </div>
      )}

      <p className="hero-dates">
        <strong>February 28 – March 5, 2027</strong> &nbsp;&middot;&nbsp; Disney's Pop Century Resort, Orlando, FL
      </p>
    </header>
  );
}
