import Button from "../buttons/Button";

interface IConfirmDetailsProps {
  email: string;
  username: string;
  municipality: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDetails = ({
  email,
  username,
  municipality,
  onClose,
  onConfirm,
}: IConfirmDetailsProps) => {
  return (
    <div className="confirm-details-container">
      <h3>Stämmer uppgifterna?</h3>
      <p className="confirm-details-important-text">
        Tänk på att andra användare kan se ditt användarnamn.
      </p>
      <p>E-post: {email}</p>
      <p>Användarnamn: {username}</p>
      <p>Kommun: {municipality}</p>

      <div className="confirm-details-buttons">
        <Button text="Ja, skapa konto" onClick={onConfirm} />
        <Button
          text="Tillbaka"
          className="confirm-details-close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default ConfirmDetails;
