import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface IBackButtonProps {
  className?: string;
}

const BackButton = ({ className }: IBackButtonProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const combinedClassName = `back-button ${className || ""}`.trim();

  const handleBack = () => {
    if (!isAuthenticated) {
      navigate("/");
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
