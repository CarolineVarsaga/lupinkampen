import { createContext, useState, ReactNode, useEffect } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (token && storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // const login = (userId: string) => {
  //   localStorage.setItem("userId", userId);
  //   setUserId(userId);
  // };

  const login = (userId: string, callback?: () => void) => {
    localStorage.setItem("userId", userId);
    setUserId(userId);

    if (callback) {
      callback();
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
  };

  const isAuthenticated = userId !== null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
