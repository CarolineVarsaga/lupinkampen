import { useState } from "react";
import Button from "../components/buttons/Button";
import { registerLupins } from "../services/registerLupinService";
import LupinPicker from "../components/register-lupins/LupinPicker";
import { lupinesValue } from "../models/lupinesValue";
import { medals } from "../models/Medals";
import { useMedalContext } from "../hooks/useMedalContext";
import BackButton from "../components/buttons/BackButton";
import { assignMedalToUser } from "../services/userService";

const RegisterLupinesPage = () => {
  const { addNotifiedMedal, hasNotifiedMedal } = useMedalContext();

  const lupinesAmountPerOption: { [key: number]: number } = {};
  lupinesValue.forEach((option) => {
    lupinesAmountPerOption[option.id] = 0;
  });

  const [lupinesPerOption, setLupinesPerOption] = useState(
    lupinesAmountPerOption
  );
  const userId = localStorage.getItem("userId");

  const handleLupinsChange = (newValue: number, id: number) => {
    setLupinesPerOption((prevLupinsPerOption) => ({
      ...prevLupinsPerOption,
      [id]: newValue,
    }));
  };

  const handleRegisterLupins = async () => {
    if (!userId) {
      alert("Användaren är inte inloggad.");
      return;
    }

    const totalPickedLupins = Object.entries(lupinesPerOption).reduce(
      (sum, [optionId, count]) => {
        const option = lupinesValue.find((s) => s.id === Number(optionId));
        return option ? sum + option.lupinesAmount * count : sum;
      },
      0
    );

    try {
      const newTotal = await registerLupins(userId, totalPickedLupins);

      const cachedUserData = localStorage.getItem("userData");
      const userData = cachedUserData ? JSON.parse(cachedUserData) : {};

      userData.totalPickedLupins = newTotal;
      userData.recentlyPickedLupins = totalPickedLupins;

      const earnedMedals = medals.filter(
        (medal) => newTotal >= medal.threshold
      );
      const sortedEarnedMedals = earnedMedals.sort(
        (a, b) => b.threshold - a.threshold
      );
      const latestMedal = sortedEarnedMedals[0];

      if (latestMedal && !hasNotifiedMedal(latestMedal.name)) {
        await assignMedalToUser(userId, latestMedal.name);

        alert(`Grattis! Du har just fått medaljen ${latestMedal.name}!`);

        if (!userData.medals) {
          userData.medals = [];
        }
        if (!userData.medals.includes(latestMedal.name)) {
          userData.medals.push(latestMedal.name);
        }

        addNotifiedMedal(latestMedal.name);
      }

      localStorage.setItem("userData", JSON.stringify(userData));

      const resetLupines: { [key: number]: number } = {};
      lupinesValue.forEach((option) => {
        resetLupines[option.id] = 0;
      });
      setLupinesPerOption(resetLupines);
    } catch (error) {
      console.error("Det gick inte att registrera lupiner:", error);
      alert("Ett fel inträffade vid registrering av lupiner.");
    }
  };

  return (
    <section className="register-lupines">
      <BackButton />
      <div className="register-lupines-container">
        <div className="register-lupines-container-top">
          <h3>Registrera lupiner</h3>

          {lupinesValue.map((option) => (
            <LupinPicker
              key={option.id}
              name={option.name}
              id={option.id}
              incrementValue={1}
              min={0}
              max={100}
              value={lupinesPerOption[option.id]}
              onLupinsChange={handleLupinsChange}
            />
          ))}
        </div>

        <div className="register-lupines-container-bottom">
          <h3>Antal plockade lupiner</h3>
          <div className="register-lupines-total-container">
            <div className="lupines-list">
              {Object.entries(lupinesPerOption)
                .filter(([, count]) => count > 0)
                .map(([optionId, count]) => {
                  const option = lupinesValue.find(
                    (s) => s.id === Number(optionId)
                  );
                  return (
                    <p key={optionId}>
                      {count}x {option?.name}
                    </p>
                  );
                })}
            </div>
            <div className="lupines-total">
              <hr />
              <p>
                Totalt:{" "}
                {Object.entries(lupinesPerOption).reduce(
                  (sum, [id, amount]) =>
                    sum +
                    lupinesValue.find((option) => option.id === Number(id))!
                      .lupinesAmount *
                      amount,
                  0
                )}{" "}
                plockade lupiner
              </p>
            </div>
          </div>
        </div>
        <Button
          text="Spara"
          className="register-lupines-button-save"
          onClick={handleRegisterLupins}
        />
      </div>
    </section>
  );
};
export default RegisterLupinesPage;
