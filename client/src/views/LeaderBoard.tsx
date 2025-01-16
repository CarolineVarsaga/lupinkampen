import { useEffect, useState } from "react";
import Button from "../components/Button";
import SwedenMap from "../components/SwedenMap";
import Dropdown from "../components/login-register-page/form/InputDropDown";
import { useFormContext } from "../hooks/useFormContext";
import { municipalities } from "../models/IMunicipality";
import {
  fetchTopMunicipalities,
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
      } catch (err: unknown) {
        setError("Kunde inte hämta topplistan över kommuner.");
        console.error("Error fetching top municipalities:", err);
      }
    };

    const getTopUsers = async () => {
      try {
        const data = await fetchTopUsers();
        setTopUsers(data);
        console.log("Topplista användare:", data);
      } catch (err: unknown) {
        setError("Kunde inte hämta topplistan över användare.");
        console.error("Error fetching top users:", err);
      }
    };

    // const fetchTopUsers = async () => {
    //   try {
    //     const response = await axios.get(`${baseURL}/api/users/topUsers`);
    //     setTopUsers(response.data);
    //     console.log("Topplista användare:", response.data);
    //   } catch (error) {
    //     setError("Kunde inte hämta topplistan över användare.");
    //     console.error("Error fetching top users:", error);
    //   }
    // };

    // const fetchTotalLupins = async () => {
    //   try {
    //     const response = await axios.get(`${baseURL}/api/users/getTotalLupins`);
    //     setTotalLupins(response.data.totalLupins);
    //     console.log("Totalt plockade lupiner:", response.data.totalLupins);
    //   } catch (error) {
    //     setError("Kunde inte hämta totalt antal plockade lupiner.");
    //     console.error("Error fetching total lupins:", error);
    //   }
    // };

    const getTotalLupins = async () => {
      try {
        const data = await fetchTotalLupins();
        setTotalLupins(data.totalLupins);
        console.log("Totalt plockade lupiner:", data.totalLupins);
      } catch (err: unknown) {
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

  const defaultOption = {
    value: "",
    label: "Hela Sverige",
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setFormData({
      ...formData,
      municipality: selectedValue,
    });
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
        ) : error ? (
          <p>{error}</p>
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
                options={[defaultOption, ...options]}
              />
              <p>Totalt antal plockade lupiner: {totalLupins} st</p>
              <div className="result-list">
                {topUsers.map((user, index) => (
                  <p key={index} className="result-list-line">
                    {index + 1}. {user.userName}{" "}
                    <span>{user.totalPickedLupins} st</span>
                  </p>
                ))}
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
