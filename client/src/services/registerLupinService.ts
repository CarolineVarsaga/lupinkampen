import { postRequest } from "./baseService";

interface IRegisterLupinsData {
  lupinsPicked: number;
}

interface IRegisterLupinsResponse {
  message: string;
}

export const registerLupins = async (userId: string, lupinsPicked: number) => {
  const data: IRegisterLupinsData = { lupinsPicked };

  try {
    const response = await postRequest<
      IRegisterLupinsData,
      IRegisterLupinsResponse
    >(`/api/users/registerLupins/${userId}`, data, true);

    console.log("Meddelande:", response.message);
    alert("Lupiner registrerade!");
  } catch (error) {
    console.error("Fel vid registrering av lupiner:", error);
    alert("Kunde inte registrera lupiner.");
  }
};
