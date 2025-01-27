import { createContext, useState, useEffect, ReactNode, useRef } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  userId: string;
  token: string | null;
  login: (userId: string, token: string, expiresIn: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const expiresAt = localStorage.getItem("expiresAt");

    if (token && storedUserId && expiresAt) {
      const now = Date.now();
      if (parseInt(expiresAt, 10) > now) {
        setUserId(storedUserId);
        setToken(token);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("userData");
        localStorage.removeItem("municipalityName");
      }
    }

    setIsLoading(false);
  }, []);

  const login = (userId: string, token: string, expiresIn: number) => {
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expiresAt.toString());
    setUserId(userId);
    setToken(token);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      logout();
    }, expiresIn * 1000);
  };

  const logout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("userData");
    localStorage.removeItem("municipalityName");
    setUserId("");
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
