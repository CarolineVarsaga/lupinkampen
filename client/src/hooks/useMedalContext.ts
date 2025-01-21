import { useContext } from "react";
import { IMedalContextType, MedalContext } from "../contexts/MedalContext";

export const useMedalContext = (): IMedalContextType => {
  const context = useContext(MedalContext);
  if (!context) {
    throw new Error("useMedalContext must be used within a MedalProvider");
  }
  return context;
};
