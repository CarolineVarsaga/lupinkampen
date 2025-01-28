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

      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      const storedData = {
        data,
        expiration: expirationDate.toISOString(),
      };

      saveToLocalStorage("lupins", storedData);
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
        const parsedData = JSON.parse(storedLupins);
        const { data, expiration } = parsedData;

        const currentDate = new Date();
        const expirationDate = new Date(expiration);

        if (currentDate <= expirationDate) {
          setLupinsInfo(data);
          setFetched(true);
        } else {
          localStorage.removeItem("lupins");
          getData();
        }
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
