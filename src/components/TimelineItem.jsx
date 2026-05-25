export function TimelineItem({ item, label, delay = 0 }) {
  return (
    <article className="timeline-item" data-reveal style={{ "--delay": `${delay}ms` }}>
      <div className="timeline-item__rail">
        <span className="timeline-item__dot" />
        <span className="timeline-item__line" />
      </div>
      <div className="timeline-item__content">
        <span className="timeline-item__label">{label}</span>
        <h3>{item.title}</h3>
        <p className="timeline-item__subtitle">{item.subtitle}</p>
        <p className="timeline-item__detail">{item.detail}</p>
      </div>
    </article>
  );
}
