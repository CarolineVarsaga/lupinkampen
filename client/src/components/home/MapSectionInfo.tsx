import BeginHereButton from "../buttons/BeginHereButton";
import LeaderboardButton from "../buttons/LeaderboardButton";

const MapSectionInfo = () => {
  return (
    <div className="map-section-info">
      <h3>Lupinkampen</h3>
      <div className="map-section-info-text-container">
        <p>Var med i Lupinkampen du också!</p>
        <p>
          Bli medlem, plocka lupiner och registrera dem för att tävla
          tillsammans med din kommun!
        </p>
        <p>Kartan visar vilken kommun som leder kampen just nu.</p>
      </div>
      <div className="buttons-container">
        <BeginHereButton />
        <LeaderboardButton />
      </div>
    </div>
  );
};

export default MapSectionInfo;
