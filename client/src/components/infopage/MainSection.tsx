import SvgWaveBottom from "../SvgWaveBottom";

const MainSection = () => {
  return (
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
          magna nec mauris sagittis, et tristique tellus tristique.
        </span>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
          magna nec mauris sagittis, et tristique tellus tristique.
        </span>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
          magna nec mauris sagittis, et tristique tellus tristique.
        </span>
      </div>
      <SvgWaveBottom className="main-section-middle-wave" />
    </main>
  );
};

export default MainSection;
