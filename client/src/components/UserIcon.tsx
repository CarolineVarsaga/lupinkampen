import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useUserDetails from "../hooks/useUserDetails";

const UserIcon = () => {
  const { isAuthenticated, userId } = useAuth();
  const navigate = useNavigate();

  const { profileImage } = useUserDetails(userId!);

  const handleIconClick = () => {
    if (isAuthenticated) {
      navigate(`/profil/${userId}`);
    } else {
      navigate("/logga-in");
    }
  };

  return (
    <div onClick={handleIconClick} className="user-icon-container">
      {isAuthenticated && profileImage ? (
        <img
          src={profileImage}
          alt="User avatar"
          className="user-icon-avatar"
        />
      ) : (
        <FaUser size={32} className="user-icon" />
      )}
    </div>
  );
};

export default UserIcon;
