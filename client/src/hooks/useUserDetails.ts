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
      const userDataResponse = await fetchUserData(userId);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Ingen giltig token hittades. Vänligen logga in igen.");
        setLoading(false);
        return;
      }

      try {
        const cachedUserData = localStorage.getItem("userData");
        if (cachedUserData) {
          try {
            setUserData(JSON.parse(cachedUserData));
          } catch (e) {
            console.error(
              "Fel vid parsing av användardata från localStorage:",
              e
            );

            setUserData(userDataResponse);
            localStorage.setItem("userData", JSON.stringify(userDataResponse));
          }
        } else {
          const userDataResponse = await fetchUserData(userId);
          setUserData(userDataResponse);
          localStorage.setItem("userData", JSON.stringify(userDataResponse));
        }

        const cachedMunicipalityName = localStorage.getItem("municipalityName");
        if (!cachedMunicipalityName) {
          const municipalityNameResponse = await fetchMunicipalityName(
            userDataResponse.userMunicipality
          );
          setMunicipalityName(municipalityNameResponse);
          localStorage.setItem(
            "municipalityName",
            JSON.stringify(municipalityNameResponse)
          );
        } else {
          try {
            setMunicipalityName(JSON.parse(cachedMunicipalityName));
          } catch (e) {
            console.error(
              "Fel vid parsing av municipalityName från localStorage:",
              e
            );
            const municipalityNameResponse = await fetchMunicipalityName(
              userDataResponse.userMunicipality
            );
            setMunicipalityName(municipalityNameResponse);
            localStorage.setItem(
              "municipalityName",
              JSON.stringify(municipalityNameResponse)
            );
          }
        }
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
      setMunicipalityName,
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
    setMunicipalityName,
    loading,
    error,
  };
};

export default useUserDetails;
