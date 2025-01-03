import { Link } from "react-router-dom";
import SvgWave from "../SvgWave";

const TopSection = () => {
  return (
    <>
      <section className="top-section">
        <Link to="/" className="link-back">
          <a className="link-back">Tillbaka till startsidan</a>
        </Link>
        <h3 className="top-section-heading">Ett hot mot den svenska floran</h3>
        <p className="top-section-text">
          Lupiner är en invasiv art som utgör ett allvarligt hot mot den svenska
          naturen. De tränger undan inhemska växter genom att konkurrera om
          resurser som näring, vatten och ljus, vilket leder till att
          biodiversiteten minskar. Lupiner sprider sig snabbt och kan etablera
          sig i stora områden, vilket gör att de förändrar hela ekosystem och
          påverkar både växt- och djurliv negativt.
        </p>
      </section>
      <SvgWave className="top-section-wave" />
    </>
  );
};

export default TopSection;
