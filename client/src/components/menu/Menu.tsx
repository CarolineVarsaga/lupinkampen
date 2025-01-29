import { Link } from "react-router-dom";
import ProtectedLink from "../ProtectedLink";
import Button from "../buttons/Button";

interface IMenuProps {
  toggleMenu: () => void;
  isAuthenticated: boolean;
  loggedInUserId: string;
  handleLogout: () => void;
}

const Menu = ({
  toggleMenu,
  isAuthenticated,
  loggedInUserId,
  handleLogout,
}: IMenuProps) => {
  return (
    <div className="dropdown-navigation-container">
      <ul>
        <Link to="/" onClick={toggleMenu}>
          <li className="dropdown-item">Startsida</li>
        </Link>
        <Link to="/information" onClick={toggleMenu}>
          <li className="dropdown-item">Information om lupiner</li>
        </Link>
        <Link to="/topplista" onClick={toggleMenu}>
          <li className="dropdown-item">Topplista</li>
        </Link>
        <li className="dropdown-item">
          <ProtectedLink
            to={`/profil/${loggedInUserId}/registrera-lupiner`}
            text="Registrera lupiner"
            toggleMenu={toggleMenu}
          />
        </li>
        <Link to="/om-lupinkampen" onClick={toggleMenu}>
          <li className="dropdown-item">Om Lupinkampen</li>
        </Link>
        <Link to="/faq" onClick={toggleMenu}>
          <li className="dropdown-item">FAQ - Frågor och svar</li>
        </Link>
        <Link to="/villkor" onClick={toggleMenu}>
          <li className="dropdown-item">Användarvillkor</li>
        </Link>
        {isAuthenticated && (
          <li className="dropdown-item log-out" onClick={handleLogout}>
            Logga ut
          </li>
        )}
      </ul>
      <Button text="Stäng" className="close-button" onClick={toggleMenu} />
    </div>
  );
};

export default Menu;
