import { Link } from "react-router-dom";
import Logo from "./Logo";
import ProtectedLink from "../components/ProtectedLink";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Logo />
        <div className="footer-page-links-container">
          <div className="footer-page-links">
            <h2>Navigering</h2>
            <Link to="/">Startsida</Link>
            <Link to="/information">Information om lupiner</Link>
            <Link to="/topplista">Topplista</Link>
            <ProtectedLink
              to="/profil/:userId/registrera-lupiner"
              text="Registrera lupiner"
              className="footer-link"
            />
            <Link to="/om-lupinkampen">Om Lupinkampen</Link>
            <Link to="/FAQ">FAQ - Frågor och svar</Link>
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
