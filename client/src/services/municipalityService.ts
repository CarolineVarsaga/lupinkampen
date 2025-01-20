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
      leaderboard?: Array<{ totalPickedLupins: number }>;
      message?: string;
    }>(`api/municipalities/score/${userMunicipalityId}`);

    if (response?.message) {
      return 0;
    }

    const leaderboard = response?.leaderboard || [];

    const totalLupins = leaderboard.reduce(
      (sum, user) => sum + (user.totalPickedLupins || 0),
      0
    );

    return totalLupins;
  } catch (error) {
    console.error(
      `Error fetching lupins for municipality ID: ${userMunicipalityId}`,
      error
    );
    return 0;
  }
};
