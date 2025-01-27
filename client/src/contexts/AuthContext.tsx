import { createContext, useState, useEffect, ReactNode } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
  login: (userId: string, token: string, expiresIn: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const expiresAt = localStorage.getItem("expiresAt");

    if (token && storedUserId && expiresAt) {
      const now = Date.now();
      if (parseInt(expiresAt) > now) {
        setUserId(storedUserId);
        setToken(token);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiresAt");
      }
    }

    setIsLoading(false);
  }, []);

  const login = (userId: string, token: string, expiresIn: number) => {
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", new Date(expiresAt).toLocaleString());
    setUserId(userId);
    setToken(token);

    setTimeout(() => {
      logout();
    }, expiresIn * 1000);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    setUserId(null);
    setToken(null);
  };

  const isAuthenticated = userId !== null && token !== null;

  if (isLoading) return <p>Laddar...</p>;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
