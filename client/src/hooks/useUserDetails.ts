import { useState, useEffect } from "react";
import {
  fetchUserData,
  fetchUserAvatar,
  fetchTotalLupins,
  fetchUserPlacement,
} from "../services/userService";
import { fetchMunicipalityName } from "../services/municipalityService";
import { IUser } from "../models/IUser";

const useUserDetails = (userId: string) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDataDetails = async () => {
      setLoading(true);
      setError(null);

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
        setError("Failed to fetch user details");
        console.error("Error fetching user profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataDetails();
  }, [userId]);

  return {
    userData,
    profileImage,
    municipalityName,
    totalLupins,
    recentPickedLupins,
    userPlacementMunicipality,
    userPlacementSweden,
    loading,
    error,
  };
};

export default useUserDetails;
