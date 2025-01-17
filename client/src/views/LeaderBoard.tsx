import { useEffect, useState } from "react";
import Button from "../components/Button";
import SwedenMap from "../components/SwedenMap";
import Dropdown from "../components/login-register-page/form/InputDropDown";
import { useFormContext } from "../hooks/useFormContext";
import { municipalities } from "../models/IMunicipality";
import {
  fetchTopMunicipalities,
  fetchTopMunicipalityUsers,
  fetchTopUsers,
  fetchTotalLupins,
} from "../services/leaderboardService";
import { IUser } from "../models/IUser";

interface IMunicipality {
  municipalityName: string;
  municipalityTotalPickedLupins: number;
}
const LeaderBoard = () => {
  const [topMunicipalities, setTopMunicipalities] = useState<IMunicipality[]>(
    []
  );
  const [topUsers, setTopUsers] = useState<IUser[]>([]);
  const [totalLupins, setTotalLupins] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedOption, setSelectedOption, formData, setFormData } =
    useFormContext();

  useEffect(() => {
    const getTopMunicipalities = async () => {
      try {
        const data = await fetchTopMunicipalities();
        const transformedData = data.map((municipality) => ({
          ...municipality,
          municipalityTotalPickedLupins:
            municipality.municipalityTotalPickedLupins ?? 0,
        }));
        setTopMunicipalities(transformedData);
      } catch (err) {
        setError("Kunde inte hämta topplistan över kommuner.");
        console.error("Error fetching top municipalities:", err);
      }
    };

    const getTopUsers = async () => {
      try {
        const data = await fetchTopUsers();
        setTopUsers(data);
      } catch (err) {
        setError("Kunde inte hämta topplistan över användare.");
        console.error("Error fetching top users:", err);
      }
    };

    const getTotalLupins = async () => {
      try {
        const data = await fetchTotalLupins();
        setTotalLupins(data.totalLupins);
      } catch (err) {
        setError("Kunde inte hämta totalt antal plockade lupiner.");
        console.error("Error fetching total lupins:", err);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        getTopMunicipalities(),
        getTopUsers(),
        getTotalLupins(),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const handleDropdownChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setFormData({
      ...formData,
      municipality: selectedValue,
    });

    try {
      if (selectedValue) {
        const users = await fetchTopMunicipalityUsers(selectedValue);
        if (users.length === 0) {
          setTopUsers([]);
          setError("Inga användare finns för den valda kommunen.");
        } else {
          setTopUsers(users);
          setError(null);
        }
      } else {
        const users = await fetchTopUsers();
        setTopUsers(users);
        setError(null);
      }
    } catch (err) {
      setError("Kunde inte hämta användare för den valda kommunen.");
      setTopUsers([]);
      console.error("Error fetching top users for municipality:", err);
    }
  };

  const options = municipalities.map((muni) => ({
    value: muni.municipalityId.toString(),
    label: muni.municipalityName,
  }));

  return (
    <section className="leaderboard">
      <div className="leaderboard-left-column">
        <h3>Topplista</h3>
        {loading ? (
          <p>Laddar...</p>
        ) : (
          <div className="leaderboard-container">
            <div className="leaderboard-container-top">
              <h4>Kommuner</h4>
              <div className="result-list">
                {topMunicipalities.map((municipality, index) => (
                  <p key={index} className="result-list-line">
                    {index + 1}. {municipality.municipalityName}
                    <span>{municipality.municipalityTotalPickedLupins} st</span>
                  </p>
                ))}
              </div>
            </div>
            <hr />
            <div className="leaderboard-container-top">
              <h4>Användare</h4>
              <Dropdown
                label="Visa användare för:"
                className="leaderboard-users-dropdown"
                value={selectedOption}
                onChange={handleDropdownChange}
                options={[{ value: "", label: "Hela Sverige" }, ...options]}
              />
              <p>Totalt antal plockade lupiner: {totalLupins} st</p>
              <div className="result-list">
                {error && topUsers.length === 0 ? (
                  <p>{error}</p>
                ) : (
                  topUsers.map((user, index) => (
                    <p key={index} className="result-list-line">
                      {index + 1}. {user.userName}{" "}
                      <span>{user.totalPickedLupins} st</span>
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
        <Button text="Registrera lupiner" className="register-lupins-button" />
      </div>
      <SwedenMap />
    </section>
  );
};

export default LeaderBoard;
