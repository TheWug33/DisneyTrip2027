export function SectionHead({ kicker, title, desc }) {
  return (
    <div className="section-head">
      {kicker && <span className="section-kicker">{kicker}</span>}
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

export function TBD({ children = 'Details coming soon' }) {
  return (
    <span className="tbd">
      <span className="tbd-dot" />
      {children}
    </span>
  );
}

export function EmptyNote({ children }) {
  return <p className="empty-note">{children}</p>;
}
