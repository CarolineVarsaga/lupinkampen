import {
  emailRegex,
  passwordRegex,
  validateUsername,
} from "./formValidationRegex";

export const validateFormData = (
  formData: {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    municipality: string;
  },
  selectedOption: string,
  options: { value: string; label: string }[],
  isChecked: boolean
): string | null => {
  if (
    !formData.username ||
    !formData.email ||
    !formData.password ||
    !formData.confirmpassword ||
    !formData.municipality
  ) {
    return "Alla fält måste fyllas i.";
  }

  if (!emailRegex.test(formData.email)) {
    return "Ogiltig e-postadress.";
  }

  const usernameError = validateUsername(formData.username);
  if (usernameError) {
    return usernameError;
  }

  if (!passwordRegex.test(formData.password)) {
    return "Lösenordet måste innehålla minst en gemen, en siffra och 8 tecken långt.";
  }

  if (formData.password !== formData.confirmpassword) {
    return "Lösenorden matchar inte.";
  }

  const selectedOptionDetails = options.find(
    (option) => option.value === selectedOption
  );
  if (!selectedOptionDetails) {
    return "Ogiltig kommun.";
  }

  if (!isChecked) {
    return "Du behöver godkänna villkoren för att fortsätta.";
  }

  return null;
};
