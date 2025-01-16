import Logo from "../../public/assets/lupine-logo.svg";
import DropDownMenu from "./menu/DropDownMenu";
import UserIcon from "./UserIcon";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="Logga Lupinkampen" className="logo" />
        <h1 className="logo-name">Lupinkampen</h1>
      </div>
      <div className="user-menu-container">
        <UserIcon />
        <DropDownMenu />
      </div>
    </header>
  );
};

export default Header;
