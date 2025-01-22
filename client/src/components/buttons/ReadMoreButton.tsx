import { useNavigate } from "react-router-dom";
import Button from "./Button";

const ReadMoreButton = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/information");
  };

  return (
    <Button
      text="Läs mer"
      className="readmore-button"
      onClick={handleNavigation}
    />
  );
};

export default ReadMoreButton;
