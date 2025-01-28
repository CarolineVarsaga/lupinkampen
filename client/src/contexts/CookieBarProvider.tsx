import { useEffect, useState } from "react";
import { CookieContext } from "./CookieBarContext";

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);

  useEffect(() => {
    const cookiesStatus = localStorage.getItem("cookiesAccepted");
    const expirationDate = localStorage.getItem("cookiesExpiration");

    if (cookiesStatus === "true" && expirationDate) {
      const currentDate = new Date();
      const expiration = new Date(expirationDate);

      if (currentDate <= expiration) {
        setCookiesAccepted(true);
      } else {
        localStorage.removeItem("cookiesAccepted");
        localStorage.removeItem("cookiesExpiration");
      }
    }
  }, []);

  const acceptCookies = () => {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    localStorage.setItem("cookiesAccepted", "true");
    localStorage.setItem("cookiesExpiration", expirationDate.toISOString());
    setCookiesAccepted(true);
  };

  return (
    <CookieContext.Provider value={{ cookiesAccepted, acceptCookies }}>
      {children}
    </CookieContext.Provider>
  );
};
