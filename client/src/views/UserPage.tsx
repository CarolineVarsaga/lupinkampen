import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import EditInformation from "../components/user-page/EditInformation";
import UserMedals from "../components/user-page/UserMedals";
import LeaderboardButton from "../components/buttons/LeaderboardButton";
import RegisterLupinsButton from "../components/buttons/RegisterLupinsButton";
import BackButton from "../components/buttons/BackButton";
import useUserDetails from "../hooks/useUserDetails";

const UserProfile = () => {
  const userId = useParams<{ userId: string | undefined }>().userId;
  const { isAuthenticated, userId: loggedInUserId } = useAuth();
  const navigate = useNavigate();
  const {
    userData,
    profileImage,
    municipalityName,
    totalLupins,
    recentPickedLupins,
    userPlacementMunicipality,
    userPlacementSweden,
    loading,
    error,
  } = useUserDetails(userId!);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/logga-in");
      return;
    }

    const stringLoggedInUserId = String(loggedInUserId);
    if (userId !== stringLoggedInUserId) {
      navigate("/logga-in");
    }
  }, [userId, isAuthenticated, loggedInUserId, navigate]);

  if (loading) return <p>Laddar användardata...</p>;
  if (error) return <p>Det gick inte att hämta användardata.</p>;

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
