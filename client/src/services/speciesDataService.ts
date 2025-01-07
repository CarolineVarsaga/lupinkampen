import axios from "axios";
import { ISpeciesData } from "../models/speciesData";

const API_URL =
  "https://api.artdatabanken.se/information/v1/speciesdataservice/v1";

const SUBSCRIPTION_KEY = import.meta.env.VITE_SUBSCRIPTION_KEY;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    "Cache-Control": "no-cache",
  },
});

export const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const getSpeciesData = async (): Promise<ISpeciesData[]> => {
  return await get<ISpeciesData[]>("/speciesdata?taxa=221248");
};
