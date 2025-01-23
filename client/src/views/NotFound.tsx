import BackButton from "../components/buttons/BackButton";
import { FaRegFaceSadTear } from "react-icons/fa6";

const NotFound = () => {
  return (
    <section>
      <div className="notfound-container">
        <div className="notfound-heading">
          <h2>404: Hoppsan, nu har du hamnat tokigt!</h2>
          <FaRegFaceSadTear size={50} />
        </div>
        <p>Vi kunde inte hitta sidan du söker.</p>

        <BackButton />
      </div>
    </section>
  );
};

export default NotFound;
