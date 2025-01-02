import Logo from "../../public/assets/lupine-logo.svg";
import { FaUser } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="Logga Lupinkampen" className="logo" />
        <h1 className="logo-name">Lupinkampen</h1>
      </div>
      <div className="user-menu-container">
        <FaUser size={32} className="user-icon" />
        <IoIosMenu size={40} className="menu" />
      </div>
    </header>
  );
};

export default Header;
