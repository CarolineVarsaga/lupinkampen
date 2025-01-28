import { ReactNode, useState } from "react";
import { MedalContext } from "./MedalContext";

export const MedalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifiedMedals, setNotifiedMedals] = useState<string[]>([]);

  const addNotifiedMedal = (medal: string) => {
    setNotifiedMedals((prev) => [...prev, medal]);
  };

  const hasNotifiedMedal = (medal: string) => {
    return notifiedMedals.includes(medal);
  };

  return (
    <MedalContext.Provider
      value={{ notifiedMedals, addNotifiedMedal, hasNotifiedMedal }}
    >
      {children}
    </MedalContext.Provider>
  );
};
