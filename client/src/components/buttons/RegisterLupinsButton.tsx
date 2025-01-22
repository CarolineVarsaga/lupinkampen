import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface IRegisterLupinsdButtonProps {
  className?: string;
  userId: string | undefined;
}

const RegisterLupinsButton = ({
  className,
  userId,
}: IRegisterLupinsdButtonProps) => {
  const navigate = useNavigate();

  const combinedClassName = `register-lupins-button ${className || ""}`.trim();

  const handleNavigation = () => {
    navigate(`/profil/${userId}/registrera-lupiner`);
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
