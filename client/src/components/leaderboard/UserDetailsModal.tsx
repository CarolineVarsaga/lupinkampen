import { useState, useEffect } from "react";
import { IUser } from "../../models/IUser";
import UserMedals from "../user-page/UserMedals";
import Button from "../buttons/Button";
import useLeaderboardUserInfo from "../../hooks/useLeaderboardUserInfo";
import { fetchMunicipalityName } from "../../services/municipalityService";
import { fetchUserPlacement } from "../../services/userService";

interface IUserDetailsModalProps {
  user: IUser;
  onClose: () => void;
}

const UserDetailsModal = ({ user, onClose }: IUserDetailsModalProps) => {
  const { topUsers, loading, error } = useLeaderboardUserInfo();
  const [municipalityName, setMunicipalityName] = useState<string | null>(null);
  const [userPlacementMunicipality, setUserPlacementMunicipality] = useState<
    number | null
  >(null);
  const [userPlacementSweden, setUserPlacementSweden] = useState<number | null>(
    null
  );

  const selectedUser = topUsers.find((u) => u.userId === user.userId);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (selectedUser) {
        try {
          const municipalityNameResponse = await fetchMunicipalityName(
            selectedUser.userMunicipality
          );
          setMunicipalityName(municipalityNameResponse);

          const municipalityPlacementResponse = await fetchUserPlacement(
            selectedUser.userId.toString(),
            "municipality"
          );
          setUserPlacementMunicipality(
            municipalityPlacementResponse.userPlacement
          );

          const swedenPlacementResponse = await fetchUserPlacement(
            selectedUser.userId.toString(),
            "sweden"
          );
          setUserPlacementSweden(swedenPlacementResponse.userPlacement);
        } catch (err) {
          console.error("Error fetching additional user data:", err);
        }
      }
    };

    fetchAdditionalData();
  }, [selectedUser]);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!selectedUser) {
    return <p>Hittade inte användaren.</p>;
  }

  return (
    <div className="user-popup">
      <div className="user-popup-content">
        <div className="user-popup-top">
          <div className="user-popup-top-left">
            <img
              src={selectedUser.avatar}
              alt={`${selectedUser.userName}'s avatar`}
              className="user-avatar-popup"
            />
            <h3>{selectedUser.userName}</h3>
            <p className="user-popup-municipality">
              {municipalityName || selectedUser.userMunicipality}
            </p>
          </div>
          <hr className="line" />
          <div className="user-popup-top-right">
            <h4>Aktivitet</h4>
            <div>
              <p>Antal plockade lupiner: {selectedUser.totalPickedLupins}</p>
              <p>
                Placering i kommunen: {userPlacementMunicipality ?? "Hämtas..."}
              </p>
              <p>Placering i Sverige: {userPlacementSweden ?? "Hämtas..."}</p>
            </div>
          </div>
        </div>

        <hr className="line" />
        <h4>Medaljer</h4>
        <UserMedals userLupinsPicked={selectedUser.totalPickedLupins} />
        <hr className="line" />
        <Button text="Stäng" className="close-button" onClick={onClose} />
      </div>
    </div>
  );
};

export default UserDetailsModal;
