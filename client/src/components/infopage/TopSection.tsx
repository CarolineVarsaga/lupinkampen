import SvgWave from "../SvgWave";

const TopSection = () => {
  return (
    <section className="top-section">
      <a className="link-back">Tillbaka till startsidan</a>
      <h3 className="top-section-heading">Ett hot mot den svenska floran</h3>
      <p className="top-section-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
        felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
        magna nec mauris sagittis, et tristique tellus tristique. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Suspendisse quis lacus
        auctor, ullamcorper nisl volutpat, lacinia risus.
      </p>
      <SvgWave className="top-section-wave" />
    </section>
  );
};

export default TopSection;
