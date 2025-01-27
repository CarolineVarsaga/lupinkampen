import { useState, useEffect } from "react";
import { fetchTopUsers } from "../services/leaderboardService";
import { IUser } from "../models/IUser";

const useLeaderboardUserInfo = () => {
  const [topUsers, setTopUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTopUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: IUser[] = await fetchTopUsers();
      setTopUsers(data);
    } catch (err) {
      setError("Kunde inte hämta topplistan över användare.");
      console.error("Error fetching top users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopUsers();
  }, []);

  return {
    topUsers,
    setTopUsers,
    setError,
    loading,
    error,
    refetch: getTopUsers,
  };
};

export default useLeaderboardUserInfo;
