export function Hero({ profile, stats }) {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Professional Information Technology Portfolio</p>
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            View Projects
          </a>
          <a className="button button-secondary" href="#certificates">
            View Certificates
          </a>
          <a className="button button-ghost" href="#contact">
            Contact Me
          </a>
        </div>
      </div>
      <aside className="hero-panel" aria-label="Quick profile summary">
        <p className="panel-label">Current Profile</p>
        <h3>{profile.shortTitle}</h3>
        <p>{profile.intro}</p>
        <div className="stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
