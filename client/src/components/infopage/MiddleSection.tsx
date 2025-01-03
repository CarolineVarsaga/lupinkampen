import Button from "../Button";

const MiddleSection = () => {
  const LupineImage = "/assets/lupines-field-1280.webp";
  return (
    <>
      {/* <section className="infopage-middle-section">
        <div className="infopage-middle-section-info">
          <h3>Ursprung</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </p>
          <h3>Bekämpning</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </p>
        </div>
      </section>
      <div className="image-container">
        <SvgWaveBottom className="middle-section-middle-wave" />
        <img
          src={LupineImage}
          alt="Ett fält med många lupiner"
          className="middle-section-lupine-image"
          width={1200}
          height={800}
        />
      </div>
      <section className="infopage-middle-lower-section-info">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
          magna nec mauris sagittis, et tristique tellus tristique.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
          magna nec mauris sagittis, et tristique tellus tristique.
        </p>
        <Button text="Börja här" className="infopage-begin-button" />
      </section> */}
      <section className="infopage-middle-section">
        <div className="infopage-middle-section-info">
          <h3>Ursprung</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </p>
          <h3>Bekämpning</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero felis, hendrerit ac dui quis, vestibulum dictum urna. Donec
            viverra magna nec mauris sagittis, et tristique tellus tristique.
          </p>
        </div>
        <div className="image-container">
          <img
            src={LupineImage}
            alt="Ett fält med många lupiner"
            className="middle-section-lupine-image"
            width={1200}
            height={800}
          />
        </div>
      </section>
      <section className="infopage-middle-lower-section-info">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
          magna nec mauris sagittis, et tristique tellus tristique.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
          magna nec mauris sagittis, et tristique tellus tristique.
        </p>
        <Button text="Börja här" className="infopage-begin-button" />
      </section>
    </>
  );
};

export default MiddleSection;
