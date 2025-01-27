import { useState, useEffect } from "react";
import { fetchUserData, fetchUserPlacement } from "../services/userService";
import { fetchMunicipalityName } from "../services/municipalityService";
import { IUser } from "../models/IUser";

const useUserDetails = (userId: string) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [municipalityName, setMunicipalityName] = useState<string | null>(null);
  const [userPlacementMunicipality, setUserPlacementMunicipality] = useState<
    number | null
  >(null);
  const [userPlacementSweden, setUserPlacementSweden] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDataDetails = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Ingen giltig token hittades. Vänligen logga in igen.");
        setLoading(false);
        return;
      }

      try {
        const userDataResponse = await fetchUserData(userId);
        setUserData(userDataResponse);

        if (!userDataResponse) {
          setError("Inget användardata hittades.");
          setLoading(false);
          return;
        }

        setUserData(userDataResponse);

        const municipalityNameResponse = await fetchMunicipalityName(
          userDataResponse.userMunicipality
        );
        setMunicipalityName(municipalityNameResponse);
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
        setError("Kunde inte hämta användardetaljer.");
        console.error("Fel vid hämtning av användarprofil:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDataDetails();
    }
  }, [userId]);

  if (!userData) {
    return {
      userData: null,
      municipalityName: null,
      profileImage: "/assets/avatar-lupine.png",
      totalLupins: 0,
      recentPickedLupins: 0,
      userPlacementMunicipality: 0,
      userPlacementSweden: 0,
      loading,
      error,
    };
  }

  return {
    userData,
    municipalityName,
    profileImage: userData.avatar,
    totalLupins: userData.totalPickedLupins,
    recentPickedLupins: userData.recentlyPickedLupins,
    userPlacementMunicipality,
    userPlacementSweden,
    loading,
    error,
  };
};

export default useUserDetails;
