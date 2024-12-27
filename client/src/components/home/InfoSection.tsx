import { Link } from "react-router-dom";
import Button from "../Button";

const InfoSection = () => {
  return (
    <section className="info-section">
      <h3 className="info-heading">Invasiv art</h3>
      <p className="info-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
        felis, hendrerit ac dui quis, vestibulum dictum urna. Donec viverra
        magna nec mauris sagittis, et tristique tellus tristique. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Suspendisse quis lacus
        auctor, ullamcorper nisl volutpat, lacinia risus. Sed vulputate nibh
        pellentesque odio consequat, non cursus ex fringilla.
      </p>
      <Link to="/information">
        <Button text="Läs mer" className="readmore-button" />
      </Link>
    </section>
  );
};

export default InfoSection;
