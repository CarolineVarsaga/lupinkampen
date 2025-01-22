import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface IBeginButtonProps {
  className?: string;
}

const BeginHereButton = ({ className }: IBeginButtonProps) => {
  const navigate = useNavigate();

  const combinedClassName = `begin-button ${className || ""}`.trim();

  const handleNavigation = () => {
    navigate("/logga-in");
  };

  return (
    <Button
      text="Börja här"
      className={combinedClassName}
      onClick={handleNavigation}
    />
  );
};

export default BeginHereButton;
