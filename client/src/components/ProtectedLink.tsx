import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

interface IProtectedLinkProps {
  to: string;
  text: string;
  className?: string;
  toggleMenu?: () => void;
}

const ProtectedLink = ({
  to,
  text,
  className,
  toggleMenu = () => {},
}: IProtectedLinkProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Du måste vara inloggad för att fortsätta.");
      navigate("/logga-in");
    } else {
      navigate(to);
    }
    toggleMenu();
  };

  return (
    <Link
      to={isAuthenticated ? to : "/logga-in"}
      onClick={handleClick}
      className={className}
    >
      {text}
    </Link>
  );
};

export default ProtectedLink;
