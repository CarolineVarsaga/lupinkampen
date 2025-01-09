import { useParams } from "react-router-dom";
import Button from "../components/Button";

const RegisterLupinesPage = () => {
  const { userId } = useParams<{ userId: string }>();
  console.log("AnvändarID från URL:", userId);

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
            <p>- 0 +</p>
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
