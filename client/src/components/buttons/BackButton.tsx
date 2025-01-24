import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface IBackButtonProps {
  className?: string;
}

const BackButton = ({ className }: IBackButtonProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuth();

  const combinedClassName = `back-button ${className || ""}`.trim();

  const handleBack = () => {
    if (!isAuthenticated && window.location.pathname === "/logga-in") {
      navigate(`/profil/${userId}`, { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleBack} className={combinedClassName}>
      <FaArrowLeft /> Tillbaka
    </button>
  );
};

export default BackButton;
