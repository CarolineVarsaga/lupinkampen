import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface IBackButtonProps {
  className?: string;
}

const BackButton = ({ className }: IBackButtonProps) => {
  const navigate = useNavigate();

  const combinedClassName = `back-button ${className || ""}`.trim();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleBack} className={combinedClassName}>
        <FaArrowLeft /> Tillbaka
      </button>
    </>
  );
};

export default BackButton;
