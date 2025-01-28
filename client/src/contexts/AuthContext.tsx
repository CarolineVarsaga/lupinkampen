import { createContext } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  userId: string;
  token: string | null;
  login: (userId: string, token: string, expiresIn: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
