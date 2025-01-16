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

export const fetchTotalLupins = async (): Promise<ITotalLupins> => {
  return await getRequest<ITotalLupins>("api/users/getTotalLupins");
};
