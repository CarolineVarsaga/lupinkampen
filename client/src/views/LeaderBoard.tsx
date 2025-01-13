import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import SwedenMap from "../components/SwedenMap";

interface IMunicipality {
  municipalityName: string;
  municipalityTotalPickedLupins: number;
}

interface IUser {
  userName: string;
  totalLupins: number;
}

const LeaderBoard = () => {
  const [topMunicipalities, setTopMunicipalities] = useState<IMunicipality[]>(
    []
  );
  const [topUsers, setTopUsers] = useState<IUser[]>([]);
  const [totalLupins, setTotalLupins] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCommunities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/municipalities/topMunicipalities"
        );
        setTopMunicipalities(response.data);
      } catch (error) {
        setError("Kunde inte hämta topplistan över kommuner.");
        console.error("Error fetching top municipalities:", error);
      }
    };

    const fetchTopUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/topUsers"
        );
        setTopUsers(response.data);
        console.log("Topplista användare:", response.data);
      } catch (error) {
        setError("Kunde inte hämta topplistan över användare.");
        console.error("Error fetching top users:", error);
      }
    };

    const fetchTotalLupins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/getTotalLupins"
        );
        setTotalLupins(response.data.totalLupins);
        console.log("Totalt plockade lupiner:", response.data.totalLupins);
      } catch (error) {
        setError("Kunde inte hämta totalt antal plockade lupiner.");
        console.error("Error fetching total lupins:", error);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchTopCommunities(),
        fetchTopUsers(),
        fetchTotalLupins(),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

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
              <p>Totalt antal plockade lupiner: {totalLupins} st</p>
              <div className="result-list">
                {topUsers.map((user, index) => (
                  <p key={index} className="result-list-line">
                    {index + 1}. {user.userName}{" "}
                    <span>{user.totalLupins} st</span>
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
