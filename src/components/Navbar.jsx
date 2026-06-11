export function Navbar({ activeSection, onSectionNavigate }) {
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
  const handleNavClick = (event, href) => {
    if (
      !href.startsWith("#") ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      !onSectionNavigate
    ) {
      return;
    }

    event.preventDefault();
    onSectionNavigate(href.slice(1));
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home" onClick={(event) => handleNavClick(event, "#home")}>
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
              onClick={(event) => handleNavClick(event, href)}
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
