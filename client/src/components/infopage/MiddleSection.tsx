import LupinInformation from "./LupinInformation";
import BeginHereButton from "../buttons/BeginHereButton";

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
            <BeginHereButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default MiddleSection;
