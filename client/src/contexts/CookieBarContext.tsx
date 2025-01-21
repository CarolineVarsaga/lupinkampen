import React, { createContext, useState, useEffect } from "react";

export interface ICookieContextProps {
  cookiesAccepted: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
}

export const CookieContext = createContext<ICookieContextProps | undefined>(
  undefined
);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);

  useEffect(() => {
    const cookiesStatus = localStorage.getItem("cookiesAccepted");
    if (cookiesStatus === "true") {
      setCookiesAccepted(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setCookiesAccepted(true);
  };

  const declineCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setCookiesAccepted(true);
  };

  return (
    <CookieContext.Provider
      value={{ cookiesAccepted, acceptCookies, declineCookies }}
    >
      {children}
    </CookieContext.Provider>
  );
};
