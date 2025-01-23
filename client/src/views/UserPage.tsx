import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import EditInformation from "../components/user-page/EditInformation";
import UserMedals from "../components/user-page/UserMedals";
import LeaderboardButton from "../components/buttons/LeaderboardButton";
import RegisterLupinsButton from "../components/buttons/RegisterLupinsButton";
import BackButton from "../components/buttons/BackButton";
import useUserDetails from "../hooks/useUserDetails";
import Button from "../components/buttons/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import { deleteUserService } from "../services/userService";

const UserProfile = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useParams<{ userId: string | undefined }>().userId;
  const { isAuthenticated, userId: loggedInUserId, logout } = useAuth();
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsChecked(true);
      setIsDisabled(false);
    } else {
      setIsChecked(false);
      setIsDisabled(true);
    }
  };

  const deleteUser = async (userId: string) => {
    console.log("Raderar konto...");

    try {
      const response = await deleteUserService(userId);
      console.log(response.message);

      logout();
    } catch (error) {
      console.error("Något gick fel vid radering av användaren:", error);
      alert("Kunde inte radera kontot. Försök igen senare.");
    }
  };

  const handleClickDelete = () => {
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    deleteUser(userId!);
    navigate("/logga-in");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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

              <div className="userpage-content-container">
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

              <div className="userpage-content-container">
                <h4>Medaljer</h4>
                <p>Plocka lupiner och vinn medaljer!</p>
                <UserMedals userLupinsPicked={totalLupins} />
              </div>

              <div className="userpage-content-container">
                <h4>Ändra dina uppgifter</h4>
                <p className="userpage-content-paragraph">
                  Fyll endast i dessa om du behöver ändra dina uppgifter.
                </p>
                <EditInformation
                  userData={userData}
                  municipalityName={municipalityName || "Välj en kommun"}
                />
              </div>
              <div className="userpage-content-container userpage-delete-user">
                <h4>Radera konto</h4>
                <p className="userpage-content-paragraph">
                  Klicka endast på knappen om du vill avsluta ditt konto. Går ej
                  att ångra!
                </p>
                <label htmlFor="checkbox" className="delete-user-label">
                  <input
                    type="checkbox"
                    id="deleteUserCheckbox"
                    name="deleteUserCheckbox"
                    className="delete-user-checkbox"
                    value=""
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span>Ja, jag vill radera mitt konto</span>
                </label>
                <Button
                  text="Radera konto"
                  className="delete-user-button"
                  disabled={isDisabled}
                  onClick={handleClickDelete}
                />
              </div>
            </div>
          </section>
        ) : (
          <p>Laddar användardata...</p>
        )}
      </div>
      {isModalOpen && (
        <ConfirmationModal
          message="Vill du radera kontot?"
          confirmButton="Radera konto"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default UserProfile;
