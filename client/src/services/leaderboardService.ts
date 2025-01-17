import { getRequest } from "./baseService";
import { IMunicipality } from "../models/IMunicipality";
import { IUser } from "../models/IUser";

interface ITotalLupins {
  totalLupins: number;
}

export const fetchTopMunicipalities = async () => {
  return await getRequest<IMunicipality[]>(
    "/api/municipalities/topMunicipalities"
  );
};

export const fetchTopUsers = async (): Promise<IUser[]> => {
  return await getRequest<IUser[]>("api/users/topUsers");
};

export const fetchTopMunicipalityUsers = async (
  municipalityId: string
): Promise<IUser[]> => {
  return await getRequest<IUser[]>(
    `api/users/getUsersScoreMunicipality/${municipalityId}`
  );
};

export const fetchTotalLupins = async (): Promise<ITotalLupins> => {
  return await getRequest<ITotalLupins>("api/users/getTotalLupins");
};

export const fetchTotalMunicipalityLupins = async (municipalityId: string) => {
  try {
    const response = await fetch(`/api/lupins/${municipalityId}`);
    const data = await response.json();

    console.log("API-svar:", data);

    return data;
  } catch (err) {
    console.error("Error fetching total lupins for municipality:", err);
    return { totalLupins: 0 };
  }
};
