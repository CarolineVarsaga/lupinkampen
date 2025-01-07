import { Link } from "react-router-dom";
import Button from "../Button";
import LupinInformation from "./LupinInformation";

const MiddleSection = () => {
  const LupineImage = "/assets/lupines-field-1280.webp";
  return (
    <>
      <section className="infopage-middle-section">
        <LupinInformation />

        <div className="image-container">
          <img
            src={LupineImage}
            alt="Ett fält med många lupiner"
            className="middle-section-lupine-image"
          />
          <div className="button-container">
            <Link to="/logga-in" className="infopage-begin-button">
              <Button text="Börja här" className="infopage-begin-button" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MiddleSection;
