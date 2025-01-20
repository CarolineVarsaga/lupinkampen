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
): Promise<IUser[] | { message: string }> => {
  try {
    const users = await getRequest<IUser[]>(
      `api/users/getUsersScoreMunicipality/${municipalityId}`
    );

    return users;
  } catch (error) {
    console.error("Error fetching users for municipality:", error);
    return { message: "Kunde inte hämta användare för denna kommun." };
  }
};

export const fetchTotalLupins = async (): Promise<ITotalLupins> => {
  return await getRequest<ITotalLupins>("api/users/getTotalLupins");
};
