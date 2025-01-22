import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IUser } from "../models/IUser";
import { fetchMunicipalityName } from "../services/municipalityService";
import {
  fetchTotalLupins,
  fetchUserData,
  fetchUserPlacement,
  fetchUserAvatar,
} from "../services/userService";
import { useAuth } from "../hooks/useAuth";
import EditInformation from "../components/user-page/EditInformation";
import UserMedals from "../components/user-page/UserMedals";
import LeaderboardButton from "../components/buttons/LeaderboardButton";
import RegisterLupinsButton from "../components/buttons/RegisterLupinsButton";
import BackButton from "../components/buttons/BackButton";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [municipalityName, setMunicipalityName] = useState<string | null>(null);
  const [totalLupins, setTotalLupins] = useState<number | null>(null);
  const [recentPickedLupins, setRecentPickedLupins] = useState<number | null>(
    null
  );
  const [userPlacementMunicipality, setUserPlacementMunicipality] = useState<
    number | null
  >(null);
  const [userPlacementSweden, setUserPlacementSweden] = useState<number | null>(
    null
  );
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { isAuthenticated, userId: loggedInUserId } = useAuth();

  useEffect(() => {
    const stringLoggedInUserId = String(loggedInUserId);

    if (!isAuthenticated) {
      navigate("/logga-in");
      return;
    }

    if (userId !== stringLoggedInUserId) {
      navigate("/logga-in");
      return;
    }

    const fetchUserDataDetails = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const [userDataResponse, avatarUrl] = await Promise.all([
            fetchUserData(userId),
            fetchUserAvatar(userId),
          ]);

          setUserData(userDataResponse);
          setProfileImage(avatarUrl);

          const municipalityNameResponse = await fetchMunicipalityName(
            userDataResponse.userMunicipality
          );
          setMunicipalityName(municipalityNameResponse);

          const lupinsResponse = await fetchTotalLupins(userId);
          setTotalLupins(lupinsResponse.totalPickedLupins);
          setRecentPickedLupins(lupinsResponse.recentlyPickedLupins);

          const municipalityPlacementResponse = await fetchUserPlacement(
            userId,
            "municipality"
          );
          setUserPlacementMunicipality(
            municipalityPlacementResponse.userPlacement
          );

          const swedenPlacementResponse = await fetchUserPlacement(
            userId,
            "sweden"
          );
          setUserPlacementSweden(swedenPlacementResponse.userPlacement);
        } catch (error) {
          console.error("Error fetching user profile data:", error);
        }
      } else {
        console.log("No token found");
      }
    };

    fetchUserDataDetails();
  }, [userId, navigate, loggedInUserId, isAuthenticated]);

  return (
    <div className="userpage">
      <BackButton />
      {userData ? (
        <section className="userpage-section">
          <div className="userpage-container">
            <div className="userpage-username-pic-container">
              <img
                src={profileImage || "/assets/profile-pic.png"}
                width={96}
                height={96}
                alt="profilbild"
              />
              <div className="userpage-username-container">
                <h3>{userData.userName}</h3>
                <p className="userpage-member-number">
                  Medlemsnummer: {userData.userId}
                </p>
                <p>Kommun: {municipalityName}</p>
              </div>
            </div>

            <div className="userpage-activity-container">
              <h4>Aktivitet</h4>
              <p>Antal plockade lupiner: {totalLupins} st</p>
              <p>Senast plockade: {recentPickedLupins} st</p>
              <div className="userpage-activity-buttons-container">
                <RegisterLupinsButton userId={userId} />
              </div>
              <hr className="userpage-activity-line" />
              {userPlacementMunicipality !== null && (
                <p>Placering i kommunen: {userPlacementMunicipality}</p>
              )}
              {userPlacementSweden !== null && (
                <p>Placering i Sverige: {userPlacementSweden}</p>
              )}
              <LeaderboardButton className="userpage-activity-button-leaderboard" />
            </div>

            <div className="userpage-medals-container">
              <h4>Medaljer</h4>
              <p>Plocka lupiner och vinn medaljer!</p>
              <UserMedals userLupinsPicked={totalLupins} />
            </div>

            <div className="userpage-information-container">
              <h4>Ändra dina uppgifter</h4>
              <p>Fyll endast i dessa om du behöver ändra dina uppgifter.</p>
              <EditInformation
                userData={userData}
                municipalityName={municipalityName || "Välj en kommun"}
              />
            </div>
          </div>
        </section>
      ) : (
        <p>Laddar användardata...</p>
      )}
    </div>
  );
};

export default UserProfile;
