import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";

interface IBeginButtonProps {
  className?: string;
}

const BeginHereButton = ({ className }: IBeginButtonProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, userId: loggedInUserId } = useAuth();
  const combinedClassName = `begin-button ${className || ""}`.trim();

  const handleNavigation = () => {
    if (!isAuthenticated) {
      navigate("/logga-in");
    } else {
      navigate(`/profil/${loggedInUserId}`);
    }
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
