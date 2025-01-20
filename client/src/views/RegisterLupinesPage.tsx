import { useState } from "react";
import Button from "../components/Button";
import { registerLupins } from "../services/registerLupinService";
import LupinPicker from "../components/register-lupins/LupinPicker";

const lupinesValue = [
  { id: 1001, name: "Full säck 125L", lupinesAmount: 50 },
  { id: 1002, name: "Halv säck 125L", lupinesAmount: 25 },
  { id: 1003, name: "Full säck 160L", lupinesAmount: 65 },
  { id: 1004, name: "Halv säck 160L", lupinesAmount: 33 },
  { id: 1005, name: "Full säck 240L", lupinesAmount: 96 },
  { id: 1006, name: "Halv säck 240L", lupinesAmount: 48 },
  { id: 1000, name: "Plockade lupiner", lupinesAmount: 1 },
];

const RegisterLupinesPage = () => {
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

    const totalLupinesPicked = Object.entries(lupinesPerOption).reduce(
      (sum, [optionId, count]) => {
        const option = lupinesValue.find((s) => s.id === Number(optionId));
        return option ? sum + option.lupinesAmount * count : sum;
      },
      0
    );

    try {
      await registerLupins(userId, totalLupinesPicked);
    } catch (error) {
      console.error("Det gick inte att registrera lupiner:", error);
    }
  };

  return (
    <section className="register-lupines">
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
