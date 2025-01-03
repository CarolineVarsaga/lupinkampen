import { useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import Button from "../Button";
import { Link } from "react-router-dom";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" aria-label="menu">
      <button onClick={toggleDropdown} className="dropdown-button">
        <IoIosMenu size={40} className="menu" />
      </button>

      {isOpen && (
        <>
          <div className="dropdown-menu">
            <div className="heading-and-close">
              <h3 className="menu-heading">Meny</h3>
              <IoMdClose
                size={40}
                onClick={toggleDropdown}
                className="close-x"
              />
            </div>
            <ul>
              <Link to="/">
                <li className="dropdown-item">Startsida</li>
              </Link>
              <Link to="/information">
                <li className="dropdown-item">Information om lupiner</li>
              </Link>
              <Link to="/">
                <li className="dropdown-item">Topplista</li>
              </Link>
              <Link to="/">
                <li className="dropdown-item">Registrera lupiner</li>
              </Link>
              <Link to="/">
                <li className="dropdown-item">Om Lupinkampen</li>
              </Link>
              <Link to="/">
                <li className="dropdown-item">FAQ - Frågor och svar</li>
              </Link>
              <Link to="/">
                <li className="dropdown-item">Användarvillkor</li>
              </Link>
              <Link to="/">
                <li className="dropdown-item log-out">Logga ut</li>
              </Link>
            </ul>
            <Button
              text="Stäng"
              className="close-button"
              onClick={toggleDropdown}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DropDownMenu;
