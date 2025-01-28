import { createContext } from "react";

export interface ICookieContextProps {
  cookiesAccepted: boolean;
  acceptCookies: () => void;
}

export const CookieContext = createContext<ICookieContextProps | undefined>(
  undefined
);
