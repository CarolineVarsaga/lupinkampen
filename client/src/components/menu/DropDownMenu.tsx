import { useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import Button from "../Button";

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
              <li className="dropdown-item">Startsida</li>
              <li className="dropdown-item">Information om lupiner</li>
              <li className="dropdown-item">Topplista</li>
              <li className="dropdown-item">Registrera lupiner</li>
              <li className="dropdown-item">Om Lupinkampen</li>
              <li className="dropdown-item">FAQ - Frågor och svar</li>
              <li className="dropdown-item">Användarvillkor</li>
              <li className="dropdown-item log-out">Logga ut</li>
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
