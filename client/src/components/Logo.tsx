import LogoImage from "../../public/assets/lupine-logo.svg";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="logo-container" onClick={handleClick}>
      <img src={LogoImage} alt="Logga Lupinkampen" className="logo" />
      <h1 className="logo-name">Lupinkampen</h1>
    </div>
  );
};

export default Logo;
