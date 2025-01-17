import Logo from "./Logo";
import DropDownMenu from "./menu/DropDownMenu";
import UserIcon from "./UserIcon";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <div className="user-menu-container">
        <UserIcon />
        <DropDownMenu />
      </div>
    </header>
  );
};

export default Header;
