import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar({ activeSection, onSectionNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}favicon.svg`;
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["Resume", "#resume"],
    ["Certs", "#certificates"],
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
    setIsMenuOpen(false);
    onSectionNavigate(href.slice(1));
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [activeSection]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#home" onClick={(event) => handleNavClick(event, "#home")}>
          <span className="brand-mark" aria-hidden="true">
            <img className="brand-logo" src={logoSrc} alt="" />
          </span>
          <span className="brand-copy">
            <strong>DevDahon</strong>
            <small>Developer · Tech Support · Instruction</small>
          </span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav
          id="primary-navigation"
          className={`site-nav${isMenuOpen ? " is-open" : ""}`}
          aria-label="Primary"
        >
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
