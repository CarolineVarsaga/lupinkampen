import { useState, useEffect } from "react";
import { getSpeciesData } from "../services/speciesDataService";
import { ISpeciesData } from "../models/speciesData";
import { saveToLocalStorage } from "../utils/localStorageUtils";

const useSpeciesData = () => {
  const [lupinsInfo, setLupinsInfo] = useState<ISpeciesData[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const data = await getSpeciesData();
      setLupinsInfo(data);
      saveToLocalStorage("lupins", data);
      setFetched(true);
    } catch (error) {
      console.error("Error fetching lupin data:", error);
      setError("Error fetching lupin data.");
    }
  };

  useEffect(() => {
    const storedLupins = localStorage.getItem("lupins");
    if (storedLupins) {
      try {
        const parsedLupins = JSON.parse(storedLupins) as ISpeciesData[];
        setLupinsInfo(parsedLupins);
        setFetched(true);
      } catch (error) {
        console.error("Error parsing localStorage lupin data:", error);
        getData();
      }
    } else {
      getData();
    }
  }, []);

  return { lupinsInfo, error, fetched };
};

export default useSpeciesData;
