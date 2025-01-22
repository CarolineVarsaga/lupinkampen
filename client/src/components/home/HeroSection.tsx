import SvgWave from "../SvgWave";
import BeginHereButton from "../buttons/BeginHereButton";

const HeroSection = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-texts-container">
          <h2 className="hero-heading">
            <span className="word-to-uppercase">Nu</span> ska lupinerna bort!
          </h2>
          <p className="hero-text">
            Var med i kampen du också! Registrera antal plockade lupiner. Tjäna
            poäng och tävla mot andra! Helt kostnadsfritt.
          </p>
        </div>
        <BeginHereButton />
      </section>
      <SvgWave className="svg-wave-top" />
    </>
  );
};

export default HeroSection;
