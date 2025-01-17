import { municipalities } from "../models/IMunicipality";
import { getRequest } from "./baseService";

export const fetchMunicipalityName = (userMunicipalityId: number): string => {
  const municipality = municipalities.find(
    (m) => m.municipalityId === userMunicipalityId
  );
  return municipality ? municipality.municipalityName : "Okänd kommun";
};

export const fetchMunicipalityLupins = async (
  userMunicipalityId: number
): Promise<number> => {
  try {
    const response = await getRequest<{
      leaderboard: Array<{ totalPickedLupins: number }>;
    }>(`api/municipalities/score/${userMunicipalityId}`);

    const totalLupins = response?.leaderboard?.reduce(
      (sum, user) => sum + (user.totalPickedLupins || 0),
      0
    );

    if (totalLupins != null) {
      return totalLupins;
    } else {
      console.warn("Invalid data format or no users in leaderboard", response);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching lupins for municipality:", error);
    return 0;
  }
};
