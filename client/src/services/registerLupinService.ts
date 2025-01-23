import { postRequest } from "./baseService";

interface IRegisterLupinsResponse {
  message: string;
  recentlyPickedLupins: number;
  newTotal: number;
}
export const registerLupins = async (userId: string, lupinsPicked: number) => {
  const data = { lupinsPicked };

  try {
    const response = await postRequest<typeof data, IRegisterLupinsResponse>(
      `/api/users/registerLupins/${userId}`,
      data,
      true
    );

    alert("Lupiner registrerade!");
    return response.newTotal;
  } catch (error) {
    console.error("Fel vid registrering av lupiner:", error);
    alert("Kunde inte registrera lupiner.");
    throw error;
  }
};
