export function Navbar({ activeSection }) {
  const logoSrc = `${import.meta.env.BASE_URL}favicon.svg`;
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Resume", "#resume"],
    ["Development", "#certificates"],
    ["Contact", "#contact"]
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            <img className="brand-logo" src={logoSrc} alt="" />
          </span>
          <span className="brand-copy">
            <strong>Rod Allen</strong>
            <small>IT Instructor / Developer</small>
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
