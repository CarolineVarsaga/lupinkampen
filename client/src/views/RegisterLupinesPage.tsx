import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";

const RegisterLupinesPage = () => {
  const [lupinsPicked, setLupinsPicked] = useState<number>(0);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleRegisterLupins = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/users/registerLupins/${userId}`,
        { lupinsPicked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Registrering lyckades:", response.data);
      alert("Lupiner registrerade!");
    } catch (error) {
      console.error("Fel vid registrering av lupiner:", error);
      alert("Kunde inte registrera lupiner.");
    }
  };

  return (
    <section className="register-lupines">
      <div className="register-lupines-container">
        <div className="register-lupines-container-top">
          <h3>Registrera lupiner</h3>
          <div className="register-lupines-add-container">
            <p>Full säck 125L</p>
            <p>- 1 +</p>
          </div>
          <div className="register-lupines-add-container">
            <p>Halv säck 125L</p>
            <p>- 0 +</p>
          </div>
          <div className="register-lupines-add-container">
            <p>Full säck 160L</p>
            <p>- 0 +</p>
          </div>
          <div className="register-lupines-add-container">
            <p>Halv säck 160L</p>
            <p>- 0 +</p>
          </div>
          <div className="register-lupines-add-container">
            <p>Full säck 240L</p>
            <p>- 0 +</p>
          </div>
          <div className="register-lupines-add-container">
            <p>Halv säck 240L</p>
            <p>- 0 +</p>
          </div>
          <div className="register-lupines-add-container">
            <p>Plockade lupiner</p>
            <input
              type="number"
              value={lupinsPicked}
              onChange={(e) => setLupinsPicked(Number(e.target.value))}
              min="1"
            />
            <button onClick={handleRegisterLupins}>Registrera</button>
          </div>
        </div>

        <div className="register-lupines-container-bottom">
          <h3>Antal plockade lupiner</h3>
          <div className="register-lupines-total-container">
            <p>x1 Full säck 125L</p>
            <div>
              <hr />
              <p>Totalt: 25 plockade lupiner</p>
            </div>
          </div>
        </div>
        <Button text="Spara" className="register-lupines-button-save" />
      </div>
    </section>
  );
};

export default RegisterLupinesPage;
