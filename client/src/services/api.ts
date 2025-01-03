import axios from "axios";
import { ISpeciesData } from "../models/speciesData";

const API_URL =
  "https://api.artdatabanken.se/information/v1/speciesdataservice/v1/speciesdata?taxa=221248";

export const fetchSpeciesData = async (): Promise<ISpeciesData[]> => {
  try {
    const response = await axios.get<ISpeciesData[]>(`${API_URL}/species`);
    return response.data;
  } catch (error) {
    console.error("Error fetching species data:", error);
    throw error;
  }
};
