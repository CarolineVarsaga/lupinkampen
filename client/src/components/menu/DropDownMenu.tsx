import { useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import Button from "../buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ConfirmationModal from "../ConfirmationModal";
import { AnimatePresence, motion } from "framer-motion";
import useLockScroll from "../../hooks/useLockScroll";

import ProtectedLink from "../ProtectedLink";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout, isAuthenticated, userId: loggedInUserId } = useAuth();
  const navigate = useNavigate();

  useLockScroll(isOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/logga-in");
    setIsModalOpen(false);
    toggleMenu();
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <div className="dropdown" aria-label="menu">
      <button onClick={toggleMenu} className="dropdown-button">
        <IoIosMenu size={40} className="menu" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="dropdown-menu-overlay">
              <div className="dropdown-menu-relative-parent">
                <motion.div
                  className="dropdown-menu"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={menuVariants}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="heading-and-close">
                    <h3 className="menu-heading">Meny</h3>
                    <IoMdClose
                      size={40}
                      onClick={toggleMenu}
                      className="close-x"
                    />
                  </div>
                  <div className="dropdown-navigation-container">
                    <ul>
                      <Link to="/" onClick={toggleMenu}>
                        <li className="dropdown-item">Startsida</li>
                      </Link>
                      <Link to="/information" onClick={toggleMenu}>
                        <li className="dropdown-item">
                          Information om lupiner
                        </li>
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
                        <li
                          className="dropdown-item log-out"
                          onClick={handleLogout}
                        >
                          Logga ut
                        </li>
                      )}
                    </ul>
                    <Button
                      text="Stäng"
                      className="close-button"
                      onClick={toggleMenu}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
      {isModalOpen && (
        <ConfirmationModal
          message="Vill du logga ut?"
          confirmButton="Logga ut"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default DropDownMenu;
