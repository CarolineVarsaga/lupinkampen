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
import { checkAvailability } from "../../../services/userService";

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
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [email, setEmail] = useState(formData.email);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<
    string | null
  >(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );

  const options = municipalities.map((muni) => ({
    value: muni.municipalityId.toString(),
    label: muni.municipalityName,
  }));

  const defaultOption = {
    value: "",
    label: "Välj kommun",
  };

  // const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setEmail(value);
  //   setFormData({ ...formData, email: value });

  //   if (debounceTimer) {
  //     clearTimeout(debounceTimer);
  //   }
  //   const newTimer = setTimeout(async () => {
  //     if (value.includes("@") && value.includes(".")) {
  //       const available = await checkAvailability("email", value);
  //       setIsEmailAvailable(available);
  //       setErrorEmail(!available);
  //     } else {
  //       setErrorEmail(true);
  //     }
  //   }, 500);

  //   setDebounceTimer(newTimer);
  //   setErrorEmail(false);
  // };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setFormData({ ...formData, email: value });

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(async () => {
      if (!value.includes("@") || !value.includes(".")) {
        setEmailErrorMessage("Ogiltig e-postadress.");
        setErrorEmail(true);
        return;
      }

      try {
        const available = await checkAvailability("email", value);
        setIsEmailAvailable(available);
        setErrorEmail(!available);
        setEmailErrorMessage(
          available ? null : "E-posten är redan registrerad."
        );
      } catch (error) {
        console.error("Fel vid kontroll av e-post:", error);
        setEmailErrorMessage("Tekniskt fel vid kontroll av e-post.");
        setErrorEmail(true);
      }
    }, 500);

    setDebounceTimer(newTimer);
    setEmailErrorMessage(null);
  };

  // const handleUsernameChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setFormData({ ...formData, username: value });

  //   if (value) {
  //     const available = await checkAvailability("username", value);
  //     setIsUsernameAvailable(available);
  //     setErrorUsername(!available);
  //   } else {
  //     setIsUsernameAvailable(true);
  //     setErrorUsername(true);
  //   }
  // };

  const handleUsernameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, username: value }));

    const validations = [
      {
        condition: /\s/.test(value),
        message: "Användarnamn får inte innehålla mellanslag.",
      },
      {
        condition: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Användarnamn får inte vara en e-postadress.",
      },
    ];

    const failedValidation = validations.find((v) => v.condition);

    if (failedValidation) {
      setIsUsernameAvailable(false);
      setErrorUsername(true);
      setUsernameErrorMessage(failedValidation.message);
      return;
    }

    try {
      const available = await checkAvailability("username", value);
      setIsUsernameAvailable(available);
      setErrorUsername(!available);
      setUsernameErrorMessage(available ? null : "Användarnamnet är upptaget.");
    } catch (err) {
      console.error("Fel vid tillgänglighetskontroll:", err);
      setIsUsernameAvailable(false);
      setErrorUsername(true);
      setUsernameErrorMessage("Ett fel uppstod, försök igen.");
    }
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isUsernameAvailable || !isEmailAvailable) {
      setErrorMessage("Rackarns bananer! Ändra följande och försök igen:");
      return;
    }

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
          {/* {errorMessage && <p className="error-message">{errorMessage}</p>}
           {!isEmailAvailable && (
            <p className="error-message">E-posten är redan registrerad.</p>
          )}
          {!isUsernameAvailable && (
            <p className="error-message">Användarnamnet är upptaget.</p>
          )} */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {!isEmailAvailable && (
            <p className="error-message">{emailErrorMessage}</p>
          )}

          {usernameErrorMessage && (
            <p className="error-message">{usernameErrorMessage}</p>
          )}

          <InputField
            forLabel="email"
            label="E-post"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required={true}
            error={errorEmail}
          />
          <InputField
            forLabel="username"
            label="Användarnamn"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleUsernameChange}
            required={true}
            error={errorUsername}
          />
          <InputField
            forLabel="password"
            label="Lösenord"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required={true}
          />
          <InputField
            forLabel="confirm password"
            label="Bekräfta lösenord"
            type="password"
            id="confirmPassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmpassword: e.target.value })
            }
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
