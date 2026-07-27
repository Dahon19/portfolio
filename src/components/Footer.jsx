export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p>Rod Allen B. Agregado</p>
          <small>Web Development · Tech Support · IT Instruction</small>
        </div>
        <small>© {currentYear} · Built with React & Vite · Open for IT opportunities</small>
      </div>
    </footer>
  );
}
