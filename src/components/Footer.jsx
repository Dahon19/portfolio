import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCredly } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p>Rod Allen B. Agregado</p>
          <small>Web Development · Tech Support · IT Instruction</small>
        </div>
        <div className="site-footer__socials" aria-label="Social media profiles">
          <a href="https://github.com/DevDahon" target="_blank" rel="noopener noreferrer" title="GitHub (@DevDahon)" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/rod-allen-agregado-73b2b4398/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href="https://www.credly.com/users/rod-allen-agregado/badges/credly" target="_blank" rel="noopener noreferrer" title="Credly Badges" aria-label="Credly">
            <SiCredly size={18} />
          </a>
          <a href="https://www.facebook.com/raagregado19" target="_blank" rel="noopener noreferrer" title="Facebook Profile" aria-label="Facebook">
            <FaFacebook size={18} />
          </a>
        </div>
        <small>© {currentYear} · Built with React & Vite · Open for IT opportunities</small>
      </div>
    </footer>
  );
}
