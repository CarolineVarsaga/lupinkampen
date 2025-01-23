import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";

interface IRegisterLupinsButtonProps {
  className?: string;
  userId: string | undefined;
}

const RegisterLupinsButton = ({
  className,
  userId,
}: IRegisterLupinsButtonProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, userId: loggedInUserId } = useAuth();

  const combinedClassName = `register-lupins-button ${className || ""}`.trim();

  const handleNavigation = () => {
    if (!isAuthenticated) {
      navigate("/logga-in");
    } else {
      if (loggedInUserId) {
        navigate(`/profil/${userId}/registrera-lupiner`);
      }
    }
  };

  return (
    <Button
      text="Registrera lupiner"
      className={combinedClassName}
      onClick={handleNavigation}
    />
  );
};

export default RegisterLupinsButton;
