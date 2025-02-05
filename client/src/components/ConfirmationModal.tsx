import Button from "./buttons/Button";

interface IConfirmationModalProps {
  message: string;
  confirmButton: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  message,
  confirmButton,
  onConfirm,
  onCancel,
}: IConfirmationModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="modal-actions">
          <Button
            onClick={onCancel}
            className="modal-button-cancel"
            text="Avbryt"
          />
          <Button
            onClick={onConfirm}
            className="modal-button-confirm"
            text={confirmButton}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
