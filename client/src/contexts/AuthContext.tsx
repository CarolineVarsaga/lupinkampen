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

// import React, { createContext, useState, ReactNode, useEffect } from "react";

// export interface IAuthContext {
//   isAuthenticated: boolean;
//   userId: string | null;
//   token: string | null;
//   login: (userId: string, token: string, expiresIn: number) => void; // Uppdaterad för att ta in expiresIn
//   logout: () => void;
// }

// export const AuthContext = createContext<IAuthContext | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUserId = localStorage.getItem("userId");
//     const savedExpiration = localStorage.getItem("tokenExpiration");

//     if (savedToken && savedUserId && savedExpiration) {
//       const expirationTime = new Date(savedExpiration).getTime();
//       const currentTime = new Date().getTime();

//       if (expirationTime > currentTime) {
//         setUserId(savedUserId);
//         setToken(savedToken);

//         const remainingTime = expirationTime - currentTime;
//         setLogoutTimer(
//           setTimeout(() => {
//             logout();
//           }, remainingTime)
//         );
//       } else {
//         logout();
//       }
//     }
//   }, []);

//   const login = (userId: string, token: string, expiresIn: number) => {
//     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

//     localStorage.setItem("userId", userId);
//     localStorage.setItem("token", token);
//     localStorage.setItem("tokenExpiration", expirationDate.toISOString());

//     setUserId(userId);
//     setToken(token);

//     if (logoutTimer) clearTimeout(logoutTimer);
//     setLogoutTimer(
//       setTimeout(() => {
//         logout();
//       }, expiresIn * 1000)
//     );
//   };

//   const logout = () => {
//     localStorage.removeItem("userId");
//     localStorage.removeItem("token");
//     localStorage.removeItem("tokenExpiration");

//     setUserId(null);
//     setToken(null);

//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//       setLogoutTimer(null);
//     }
//   };

//   const isAuthenticated = userId !== null && token !== null;

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, userId, token, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
