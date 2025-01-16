import { municipalities } from "../models/IMunicipality";

export const fetchMunicipalityName = (userMunicipalityId: number): string => {
  const municipality = municipalities.find(
    (m) => m.municipalityId === userMunicipalityId
  );
  return municipality ? municipality.municipalityName : "Okänd kommun";
};
