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
      console.log("Fetching data from API...");
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
        console.log("Loaded data from localStorage:", parsedLupins);
        setLupinsInfo(parsedLupins);
        setFetched(true);
      } catch (error) {
        console.error("Error parsing localStorage lupin data:", error);
        getData();
      }
    } else {
      console.log("No data in localStorage, fetching from API...");
      getData();
    }
  }, []);

  return { lupinsInfo, error, fetched };
};

export default useSpeciesData;
