export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p>Rod Allen B. Agregado</p>
          <small>Software, service, and instruction.</small>
        </div>
        <small>© {currentYear} · Built with React · Available for meaningful IT work.</small>
      </div>
    </footer>
  );
}
