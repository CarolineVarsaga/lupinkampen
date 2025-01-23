import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchUserAvatar } from "../services/userService";

const UserIcon = () => {
  const { isAuthenticated, userId } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAvatar = async () => {
      if (!userId) {
        setProfileImage(null);
        return;
      }

      try {
        const avatarUrl = await fetchUserAvatar(userId);
        setProfileImage(avatarUrl);
      } catch (error) {
        console.error("Failed to fetch avatar", error);
        setProfileImage(null);
      }
    };
    loadAvatar();
  }, [userId]);

  const handleIconClick = () => {
    if (isAuthenticated) {
      navigate(`/profil/${userId}`);
    } else {
      navigate("/logga-in");
    }
  };

  return (
    <div onClick={handleIconClick} className="user-icon-container">
      {profileImage ? (
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
