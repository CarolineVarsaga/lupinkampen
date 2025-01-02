import SvgWaveBottom from "../SvgWaveBottom";

const MainSection = () => {
  const LupineImage = "/assets/lupines-field-1280.webp";
  return (
    <>
      <main className="main-section">
        <h3>Ursprung</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
          magna nec mauris sagittis, et tristique tellus tristique.
        </p>
        <h3>Bekämpning</h3>
        <div className="main-section-info">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </span>
        </div>
      </main>
      <SvgWaveBottom className="main-section-middle-wave" />
      <img
        src={LupineImage}
        alt="Ett fält med många lupiner"
        className="main-section-lupine-image"
        width={1200}
        height={800}
      />
      <SvgWaveBottom className="main-section-middle-wave-2" />
    </>
  );
};

export default MainSection;
