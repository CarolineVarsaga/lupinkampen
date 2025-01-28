import { createContext } from "react";

export interface IMedalContextType {
  notifiedMedals: string[];
  addNotifiedMedal: (medal: string) => void;
  hasNotifiedMedal: (medal: string) => boolean;
}

export const MedalContext = createContext<IMedalContextType | undefined>(
  undefined
);
