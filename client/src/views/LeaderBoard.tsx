import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";

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
      <h3>Topplista</h3>
      {loading ? (
        <p>Laddar...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="leaderboard-container">
          <div className="leaderboard-container-top">
            <h4>Kommuner</h4>
            <div>
              {topMunicipalities.map((municipality, index) => (
                <p key={index}>
                  {index + 1}. {municipality.municipalityName} -{" "}
                  {municipality.municipalityTotalPickedLupins} st
                </p>
              ))}
            </div>
          </div>
          <hr />
          <div className="leaderboard-container-top">
            <h4>Användare</h4>
            <p>Totalt antal plockade lupiner: {totalLupins} st</p>
            <div>
              {topUsers.map((user, index) => (
                <p key={index}>
                  {index + 1}. {user.userName} - {user.totalLupins} st
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
      <Button text="Registrera lupiner" className="register-lupins-button" />
    </section>
  );
};

export default LeaderBoard;
