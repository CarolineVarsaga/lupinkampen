import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Logo />
        <div className="footer-page-links-container">
          <div className="footer-page-links">
            <h4>Navigering</h4>
            <Link to="/">Startsida</Link>
            <Link to="/information">Information om lupiner</Link>
            <Link to="/topplista">Topplista</Link>
            <Link to="/profil/:userId/registrera-lupiner">
              Registrera lupiner
            </Link>
            <Link to="/">Om Lupinkampen</Link>
            <Link to="/">FAQ - Frågor och svar</Link>
          </div>
          <div className="footer-terms-policy">
            <Link to="/villkor" className="footer-user-terms">
              Användarvillkor
            </Link>
            <Link to="/integritetspolicy" className="footer-user-terms">
              Integritetspolicy
            </Link>
            <Link to="/policy" className="footer-cookie-policy">
              Cookie-policy
            </Link>
          </div>
        </div>
      </div>

      <p className="copyright-text">
        &copy; 2025 Lupinkampen |
        <a
          href="https://github.com/CarolineVarsaga"
          target="_blank"
          rel="noopener noreferrer"
        >
          Caroline Vårsaga
        </a>
        | Examensprojekt
      </p>
    </footer>
  );
};

export default Footer;
