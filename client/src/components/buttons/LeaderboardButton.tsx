import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface ILeaderboardButtonProps {
  className?: string;
}

const LeaderboardButton = ({ className }: ILeaderboardButtonProps) => {
  const navigate = useNavigate();

  const combinedClassName = `highscore-button ${className || ""}`.trim();

  const handleNavigation = () => {
    navigate("/topplista");
  };

  return (
    <Button
      text="Topplista"
      className={combinedClassName}
      onClick={handleNavigation}
    />
  );
};

export default LeaderboardButton;
