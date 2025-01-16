import { customAxios } from "./baseService";

interface ILoginResponse {
  token: string;
  user: string;
}

export const login = async (username: string, password: string) => {
  try {
    const response = await customAxios.post<ILoginResponse>(
      "/api/users/login",
      {
        userName: username,
        password: password,
      }
    );

    if (response.status === 200) {
      const { token, user } = response.data;

      return { token, user };
    }
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(
      "Inloggning misslyckades. Kontrollera användarnamn och lösenord."
    );
  }
};
