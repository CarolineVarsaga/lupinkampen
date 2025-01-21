import { useState, useEffect } from "react";
import { fetchTopMunicipalities } from "../../services/leaderboardService";
import Button from "../Button";
import SvgWaveBottom from "../SvgWaveBottom";
import SwedenMap from "../SwedenMap";

const MapSection = () => {
  const BackgroundPolygon = "/assets/leading-municipality-container-bg.svg";

  const [leadingMunicipality, setLeadingMunicipality] = useState<{
    name: string;
    lupins: number;
  } | null>(null);

  const getLeadingMunicipality = async () => {
    try {
      const municipalities = await fetchTopMunicipalities();

      if (municipalities && municipalities.length > 0) {
        const topMunicipality = municipalities[0];
        setLeadingMunicipality({
          name: topMunicipality.municipalityName,
          lupins: topMunicipality.municipalityTotalPickedLupins ?? 0,
        });
      } else {
        console.log("Ingen kommundata tillgänglig.");
      }
    } catch (error) {
      console.error("Failed to fetch municipalities:", error);
    }
  };
  useEffect(() => {
    getLeadingMunicipality();
  }, []);

  return (
    <section className="map-section">
      <SvgWaveBottom className="svg-wave-bottom" />
      <div className="round-image-container"></div>
      <img src={BackgroundPolygon} alt="" className="background-polygon" />
      <div className="leading-municipality-container">
        <h3>Just nu</h3>
        <div>
          <h4>Ledande kommun:</h4>
          <p>{leadingMunicipality?.name || "Ingen data tillgänglig"}</p>
        </div>
        <div>
          <h4>Antal plockade lupiner:</h4>
          <p>
            {leadingMunicipality
              ? `${leadingMunicipality.lupins} st`
              : "Ingen data tillgänglig"}
          </p>
        </div>
      </div>
      <SwedenMap />
      <Button text="Topplista" className="highscore-button" />
    </section>
  );
};

export default MapSection;
