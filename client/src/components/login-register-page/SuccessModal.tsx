import { Link } from "react-router-dom";
import Button from "../buttons/Button";

interface ISuccessModalProps {
  onClose: () => void;
}
const SuccessModal = ({ onClose }: ISuccessModalProps) => {
  return (
    <div className="success-modal-container">
      <h3>Fantastiskt!</h3>
      <p>
        Du har nu skapat en användare och är redo att ta dig an kampen mot
        lupinerna!
      </p>
      <p>Bara att logga in och börja!</p>

      <div className="success-modal-button-container">
        <Link to="/logga-in" className="success-modal-close-button">
          <Button
            text="Stäng"
            className="success-modal-close-button"
            onClick={onClose}
          />
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;
