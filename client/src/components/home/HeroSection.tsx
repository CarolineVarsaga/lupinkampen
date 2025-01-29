import SvgWave from "../SvgWave";
import AnimatedH2 from "../animations/AnimatedH2";
import AnimatedText from "../animations/AnimatedText";
import BeginHereButton from "../buttons/BeginHereButton";

const HeroSection = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-texts-container">
          <AnimatedH2
            textSpan="Nu"
            text=" ska lupinerna bort!"
            classNameSpan="word-to-uppercase"
            className="hero-heading"
          />

          <AnimatedText
            text="Var med i kampen du också! Registrera antal plockade lupiner. Tjäna
            poäng och tävla mot andra! Helt kostnadsfritt."
            className="hero-text"
          />
        </div>
        <BeginHereButton />
      </section>
      <SvgWave className="svg-wave-top" />
    </>
  );
};

export default HeroSection;
