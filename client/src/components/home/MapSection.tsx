import Button from "../Button";
// import Map from "../../../public/assets/sweden.svg";
// import BackgroundPolygon from "../../../public/assets/leading-municipality-container-bg.svg";
import SvgWaveBottom from "../SvgWaveBottom";

const MapSection = () => {
  const Map = "/assets/sweden.svg";
  const BackgroundPolygon = "/assets/leading-municipality-container-bg.svg";

  return (
    <section className="map-section">
      <SvgWaveBottom className="svg-wave-bottom" />
      <div className="round-image-container"></div>
      <img src={BackgroundPolygon} alt="" className="background-polygon" />
      <div className="leading-municipality-container">
        <h3>Just nu</h3>
        <div>
          <h4>Ledande kommun:</h4>
          {/* Hämta kommun från databas */}
          <p>Örnsköldsviks kommun</p>
        </div>
        <div>
          <h4>Antal plockade lupiner:</h4>
          {/* Hämta antal från databas */}
          <p>2753 st</p>
        </div>
      </div>
      <img src={Map} alt="Sverigekarta" className="map" />
      <Button text="Topplista" className="highscore-button" />
    </section>
  );
};

export default MapSection;
