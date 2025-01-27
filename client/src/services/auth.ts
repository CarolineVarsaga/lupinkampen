import { customAxios } from "./baseService";

interface ILoginResponse {
  token: string;
  user: string;
  expiresIn: number;
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
      const { token, user, expiresIn } = response.data;

      return { token, user, expiresIn };
    }
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(
      "Inloggning misslyckades. Kontrollera användarnamn och lösenord."
    );
  }
};
