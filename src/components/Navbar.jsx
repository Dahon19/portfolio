export function Navbar({ activeSection }) {
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Certificates", "#certificates"],
    ["Resume", "#resume"],
    ["Contact", "#contact"]
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home">
          <span className="brand-mark">RA</span>
          <span className="brand-copy">
            <strong>Rod Allen Portfolio</strong>
            <small>Software Engineer • IT Instructor</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? "is-active" : ""}
              aria-current={activeSection === href.slice(1) ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
