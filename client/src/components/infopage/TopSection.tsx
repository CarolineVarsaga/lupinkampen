import AnimatedH2 from "../animations/AnimatedH2";
import AnimatedText from "../animations/AnimatedText";
import BackButton from "../buttons/BackButton";
import SvgWave from "../SvgWave";

const TopSection = () => {
  return (
    <>
      <section className="top-section">
        <BackButton className="link-back" />
        <AnimatedH2
          className="top-section-heading"
          text="Ett hot mot den svenska floran"
        />
        <AnimatedText
          className="top-section-text"
          text="Lupiner är en invasiv art som utgör ett allvarligt hot mot den svenska
          naturen. De tränger undan inhemska växter genom att konkurrera om
          resurser som näring, vatten och ljus, vilket leder till att
          biodiversiteten minskar. Lupiner sprider sig snabbt och kan etablera
          sig i stora områden, vilket gör att de förändrar hela ekosystem och
          påverkar både växt- och djurliv negativt."
        />
      </section>
      <SvgWave className="top-section-wave" />
    </>
  );
};

export default TopSection;
