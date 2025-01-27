import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useUserDetails from "../hooks/useUserDetails";
import ConfirmationModal from "../components/ConfirmationModal";
import { deleteUserService } from "../services/userService";
import UserProfileSection from "../components/user-page/UserProfileSection";
import UserActivitySection from "../components/user-page/UserActivitySection";
import UserMedalsSection from "../components/user-page/UserMedalsSection";
import UserEditSection from "../components/user-page/UserEditSection";
import UserDeleteSection from "../components/user-page/UserDeleteSection";
import BackButton from "../components/buttons/BackButton";
import LoadingSpinner from "../components/LoadingSpinner";

const UserPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthenticated, logout, userId } = useAuth();
  const navigate = useNavigate();
  const {
    userData,
    municipalityName,
    setMunicipalityName,
    totalLupins,
    recentPickedLupins,
    userPlacementMunicipality,
    userPlacementSweden,
    error,
  } = useUserDetails(userId);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      navigate("/logga-in");
      return;
    }
    if (!userData) {
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [userId, isAuthenticated, navigate, userData]);

  useEffect(() => {
    const cachedMunicipalityName = localStorage.getItem("municipalityName");

    if (cachedMunicipalityName) {
      try {
        setMunicipalityName(JSON.parse(cachedMunicipalityName));
      } catch (e) {
        console.error(
          "Fel vid parsing av municipalityName från localStorage:",
          e
        );
      }
    }
  }, [setMunicipalityName]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Det gick inte att hämta användardata.</p>;
  }

  if (!userData) {
    return <p>Inget användardata hittades.</p>;
  }

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
    try {
      await deleteUserService(userId);
      logout();
    } catch (error) {
      console.error("Något gick fel vid radering av användaren:", error);
      alert("Kunde inte radera kontot. Försök igen senare.");
    }
  };

  return (
    <>
      <div className="userpage">
        <BackButton />
        {userData ? (
          <section className="userpage-section">
            <div className="userpage-container">
              <UserProfileSection
                userName={userData.userName}
                userId={userData.userId.toString()}
                profileImage={userData.avatar}
                municipalityName={municipalityName}
              />

              <UserActivitySection
                totalLupins={totalLupins}
                recentPickedLupins={recentPickedLupins}
                userPlacementMunicipality={userPlacementMunicipality}
                userPlacementSweden={userPlacementSweden}
                userId={userId!.toString()}
                loading={loading}
              />
              <UserMedalsSection totalLupins={totalLupins} />
              <UserEditSection
                userData={userData}
                municipalityName={municipalityName || "Välj en kommun"}
                setMunicipalityName={setMunicipalityName}
              />
              <UserDeleteSection
                isChecked={isChecked}
                isDisabled={isDisabled}
                handleCheckboxChange={handleCheckboxChange}
                handleClickDelete={() => setIsModalOpen(true)}
              />
            </div>
          </section>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {isModalOpen && (
        <ConfirmationModal
          message="Vill du radera kontot?"
          confirmButton="Radera konto"
          onConfirm={() => deleteUser(userId)}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserPage;
