import React from "react";
import Button from "../buttons/Button";

interface IUserDeleteSectionProps {
  isChecked: boolean;
  isDisabled: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickDelete: () => void;
}

const UserDeleteSection = ({
  isChecked,
  isDisabled,
  handleCheckboxChange,
  handleClickDelete,
}: IUserDeleteSectionProps) => (
  <div className="userpage-content-container userpage-delete-user">
    <h4>Radera konto</h4>
    <p className="userpage-content-paragraph">
      Klicka endast på knappen om du vill avsluta ditt konto. Går ej att ångra!
    </p>
    <label htmlFor="checkbox" className="delete-user-label">
      <input
        type="checkbox"
        id="deleteUserCheckbox"
        name="deleteUserCheckbox"
        className="delete-user-checkbox"
        value=""
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span>Ja, jag vill radera mitt konto</span>
    </label>
    <Button
      text="Radera konto"
      className="delete-user-button"
      disabled={isDisabled}
      onClick={handleClickDelete}
    />
  </div>
);

export default UserDeleteSection;
