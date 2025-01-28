import { useEffect, useState } from "react";
import {
  fetchTopMunicipalities,
  fetchTopMunicipalityUsers,
  fetchTopUsers,
  fetchTotalLupins,
} from "../../services/leaderboardService";
import { fetchMunicipalityLupins } from "../../services/municipalityService";
import TopMunicipalities from "../../components/leaderboard/TopMunicipalities";
import TopUsers from "../../components/leaderboard/TopUsers";
import { IUser } from "../../models/IUser";
import { IMunicipality } from "../../models/IMunicipality";
import { useFormContext } from "../../hooks/useFormContext";
import { useAuth } from "../../hooks/useAuth";

interface ILeaderboardContainerProps {
  setSelectedUser: (user: IUser) => void;
}

const LeaderboardContainer = ({
  setSelectedUser,
}: ILeaderboardContainerProps) => {
  const [topMunicipalities, setTopMunicipalities] = useState<IMunicipality[]>(
    []
  );
  const { userId: loggedInUserId } = useAuth();
  const [topUsers, setTopUsers] = useState<IUser[]>([]);
  const [totalLupins, setTotalLupins] = useState<number>(0);
  const [municipalityLupins, setMunicipalityLupins] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { selectedOption, setSelectedOption, formData, setFormData } =
    useFormContext();

  useEffect(() => {
    setSelectedOption("");
  }, [setSelectedOption]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const municipalitiesData = await fetchTopMunicipalities();
        const transformedData = municipalitiesData.map((municipality) => ({
          ...municipality,
          municipalityTotalPickedLupins:
            municipality.municipalityTotalPickedLupins ?? 0,
        }));
        setTopMunicipalities(transformedData);

        const usersData = await fetchTopUsers();
        setTopUsers(usersData);

        const totalLupinsData = await fetchTotalLupins();
        setTotalLupins(totalLupinsData.totalLupins);
      } catch (err) {
        setError("Could not fetch leaderboard data.");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDropdownChange = async (selectedValue: string) => {
    setSelectedOption(selectedValue);
    setFormData({
      ...formData,
      municipality: selectedValue,
    });

    try {
      if (selectedValue) {
        const usersOrMessage = await fetchTopMunicipalityUsers(selectedValue);

        if ("message" in usersOrMessage) {
          setError(usersOrMessage.message);
          setTopUsers([]);
        } else {
          setTopUsers(usersOrMessage);
          setError(null);
        }

        const municipalityId = parseInt(selectedValue, 10);
        const lupinsCount = await fetchMunicipalityLupins(municipalityId);
        setMunicipalityLupins(lupinsCount);
      } else {
        const users = await fetchTopUsers();
        setTopUsers(users);

        const totalLupinsData = await fetchTotalLupins();
        setTotalLupins(totalLupinsData.totalLupins);
        setMunicipalityLupins(0);
        setError(null);
      }
    } catch (err) {
      setError("Kunde inte hämta data för den valda kommunen.");
      console.error("Error fetching data for selected municipality:", err);
    }
  };

  const handleUserClick = (user: IUser) => {
    if (loggedInUserId) {
      setSelectedUser(user);
    } else {
      alert("Du måste vara inloggad för att se användardetaljer.");
    }
  };

  return (
    <>
      <TopMunicipalities topMunicipalities={topMunicipalities} />
      <hr />
      <TopUsers
        selectedOption={selectedOption}
        setSelectedOption={handleDropdownChange}
        topUsers={topUsers}
        error={error}
        totalLupins={totalLupins}
        municipalityLupins={municipalityLupins}
        handleUserClick={handleUserClick}
      />
    </>
  );
};

export default LeaderboardContainer;
