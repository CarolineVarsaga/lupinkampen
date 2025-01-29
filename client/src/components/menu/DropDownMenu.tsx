import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import ConfirmationModal from "../ConfirmationModal";
import { AnimatePresence, motion } from "framer-motion";
import useLockScroll from "../../hooks/useLockScroll";
import { useFormContext } from "../../hooks/useFormContext";
import Menu from "./Menu";
import { useState } from "react";

const DropDownMenu = () => {
  const { logout, isAuthenticated, userId: loggedInUserId } = useAuth();
  const { setFormData, setSelectedOption } = useFormContext();
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useModal();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  useLockScroll(isOpen);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => setIsConfirmationModalOpen(true);

  const handleConfirmLogout = () => {
    setFormData({
      username: "",
      password: "",
      email: "",
      confirmpassword: "",
      municipality: "",
    });
    setSelectedOption("");
    logout();
    navigate("/logga-in");
    setIsConfirmationModalOpen(false);
    setIsOpen(false);
  };

  const handleCancelLogout = () => setIsConfirmationModalOpen(false);

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <div className="dropdown">
      <button
        onClick={toggleMenu}
        className="dropdown-button"
        aria-label="Öppna meny"
      >
        <IoIosMenu size={40} className="menu" />
      </button>

      <AnimatePresence>
        {isOpen && (
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
                    aria-label="Stäng meny"
                  />
                </div>
                <Menu
                  toggleMenu={toggleMenu}
                  isAuthenticated={isAuthenticated}
                  loggedInUserId={loggedInUserId}
                  handleLogout={handleLogout}
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {isConfirmationModalOpen && (
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
