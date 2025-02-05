import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./InputDropDown";
import Checkbox from "./Checkbox";
import { municipalities } from "../../../models/IMunicipality";
import ConfirmDetails from "../ConfirmDetails";
import { useFormContext } from "../../../hooks/useFormContext";
import { submitForm } from "../../../services/submitForm";
import SuccessModal from "../SuccessModal";
import { validateFormData } from "../../../utils/validationsUtils";
import RegisterButton from "../../buttons/RegisterButton";

const FormRegister = () => {
  const {
    formData,
    setFormData,
    selectedOption,
    setSelectedOption,
    errorMessage,
    setErrorMessage,
  } = useFormContext();

  const [isChecked, setIsChecked] = useState(false);
  const [showConfirmDetails, setShowConfirmDetails] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const options = municipalities.map((muni) => ({
    value: muni.municipalityId.toString(),
    label: muni.municipalityName,
  }));

  const defaultOption = {
    value: "",
    label: "Välj kommun",
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setFormData({
      ...formData,
      municipality: selectedValue,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateFormData(
      formData,
      selectedOption,
      options,
      isChecked
    );
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setShowConfirmDetails(true);
  };

  const handleConfirm = async () => {
    await submitForm({
      formData,
      selectedOption,
      setFormData,
      setSelectedOption,
      setErrorMessage,
      errorMessage,
    });
    setShowConfirmDetails(false);
    setShowSuccessModal(true);
  };

  const handleCloseConfirmDetails = () => {
    setShowConfirmDetails(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const selectedMunicipalityName =
    options.find((option) => option.value === selectedOption)?.label || "";

  return (
    <>
      {showConfirmDetails ? (
        <ConfirmDetails
          email={formData.email}
          username={formData.username}
          municipality={selectedMunicipalityName}
          onClose={handleCloseConfirmDetails}
          onConfirm={handleConfirm}
        />
      ) : showSuccessModal ? (
        <SuccessModal onClose={handleCloseSuccessModal} />
      ) : (
        <form className="register-form" onSubmit={handleSubmit}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <InputField
            forLabel="email"
            label="E-post"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
          />
          <InputField
            forLabel="username"
            label="Användarnamn"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required={true}
          />
          <InputField
            forLabel="password"
            label="Lösenord"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />
          <InputField
            forLabel="confirm password"
            label="Bekräfta lösenord"
            type="password"
            id="confirmPassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            required={true}
          />
          <Dropdown
            label="Kommun"
            className="drop-down"
            value={selectedOption}
            onChange={handleDropdownChange}
            options={[defaultOption, ...options]}
          />
          <Checkbox
            className="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            value=""
          />
          <RegisterButton />
        </form>
      )}
    </>
  );
};

export default FormRegister;
