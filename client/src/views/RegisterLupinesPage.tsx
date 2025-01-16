import { useState } from "react";
import Button from "../components/Button";
import { registerLupins } from "../services/registerLupinService";

const RegisterLupinesPage = () => {
  const [lupinsPicked, setLupinsPicked] = useState<number>(0);
  const [selectedLupins, setSelectedLupins] =
    useState<string>("Plockade lupiner");
  const userId = localStorage.getItem("userId");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    const max = 9999;
    const min = 1;

    if (value > max) {
      value = max;
    }
    if (value < min) {
      value = min;
    }

    setLupinsPicked(value);
  };

  const handleRegisterLupins = async () => {
    if (!userId) {
      alert("Användaren är inte inloggad.");
      return;
    }

    await registerLupins(userId, lupinsPicked);
  };

  const handleIncrease = (lupin: string) => {
    setSelectedLupins(lupin);
    setLupinsPicked((prev) => prev + 1);
  };

  const handleDecrease = (lupin: string) => {
    setSelectedLupins(lupin);
    setLupinsPicked((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <section className="register-lupines">
      <div className="register-lupines-container">
        <div className="register-lupines-container-top">
          <h3>Registrera lupiner</h3>

          <div className="register-lupines-add-container">
            <p>Plockade lupiner</p>
            <div className="lupins-picker-container">
              <button
                onClick={() => handleDecrease("plockade lupiner")}
                className="lupins-button-decrease amount-button"
              >
                -
              </button>
              <input
                type="number"
                value={lupinsPicked}
                onChange={handleInputChange}
                min="1"
                max="2200"
                className="lupins-input"
              />
              <button
                onClick={() => handleIncrease("plockade lupiner")}
                className="lupins-button-increase amount-button"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="register-lupines-container-bottom">
          <h3>Antal plockade lupiner</h3>
          <div className="register-lupines-total-container">
            {lupinsPicked > 0 && (
              <p>
                {lupinsPicked}x {selectedLupins}
              </p>
            )}
            <div>
              <hr />
              <p>Totalt: {lupinsPicked} plockade lupiner</p>
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
