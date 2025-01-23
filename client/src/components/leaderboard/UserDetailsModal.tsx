import { IUser } from "../../models/IUser";
import UserMedals from "../user-page/UserMedals";
import Button from "../buttons/Button";
import useUserDetails from "../../hooks/useUserDetails";

interface IUserDetailsModalProps {
  user: IUser;
  onClose: () => void;
}

const UserDetailsModal = ({ user, onClose }: IUserDetailsModalProps) => {
  const {
    profileImage,
    municipalityName,
    totalLupins,
    userPlacementMunicipality,
    userPlacementSweden,
    loading,
    error,
  } = useUserDetails(user.userId.toString());

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-popup">
      <div className="user-popup-content">
        <div className="user-popup-top">
          <div className="user-popup-top-left">
            <img
              src={profileImage || user.avatar}
              alt={`${user.userName}'s avatar`}
              className="user-avatar-popup"
            />
            <h3>{user.userName}</h3>
            <p className="user-popup-municipality">{municipalityName}</p>
          </div>
          <hr className="line" />
          <div className="user-popup-top-right">
            <h4>Aktivitet</h4>
            <div>
              <p>Antal plockade lupiner: {totalLupins}</p>
              <p>Placering i kommunen: {userPlacementMunicipality}</p>
              <p>Placering i Sverige: {userPlacementSweden}</p>
            </div>
          </div>
        </div>

        <hr className="line" />
        <h4>Medaljer</h4>
        <UserMedals userLupinsPicked={totalLupins} />
        <hr className="line" />
        <Button text="Stäng" className="close-button" onClick={onClose} />
      </div>
    </div>
  );
};

export default UserDetailsModal;
