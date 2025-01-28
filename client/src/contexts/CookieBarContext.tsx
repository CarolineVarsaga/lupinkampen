import { createContext } from "react";

export interface ICookieContextProps {
  cookiesAccepted: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
}

export const CookieContext = createContext<ICookieContextProps | undefined>(
  undefined
);
