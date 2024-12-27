import Button from "../Button";

const HeroSection = () => {
  return (
    <>
      <section className="hero-section">
        <h2 className="hero-heading">
          <span className="word-to-uppercase">Nu</span> ska lupinerna bort!
        </h2>
        <p className="hero-text">
          Var med i kampen du också! Registrera antal plockade lupiner. Tjäna
          poäng och tävla mot andra! Helt kostnadsfritt.
        </p>
        <Button text="Börja här" className="begin-button" />
      </section>
    </>
  );
};

export default HeroSection;
