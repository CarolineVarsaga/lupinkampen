import { useContext } from "react";
import {
  CookieContext,
  ICookieContextProps,
} from "../contexts/CookieBarContext";

export const useCookies = (): ICookieContextProps => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookies must be used within a CookieProvider");
  }
  return context;
};
