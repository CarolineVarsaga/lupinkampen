import { postRequest } from "./baseService";
import { IForm } from "../models/formModels";

export const submitForm = async ({
  formData,
  selectedOption,
  setFormData,
  setSelectedOption,
  setErrorMessage,
}: IForm) => {
  try {
    await postRequest<
      {
        userName: string;
        password: string;
        userMunicipality: string;
        email: string;
      },
      { message: string }
    >("/api/users/create", {
      userName: formData.username,
      password: formData.password,
      userMunicipality: selectedOption,
      email: formData.email,
    });
    setFormData({
      username: "",
      password: "",
      email: "",
      confirmpassword: "",
      municipality: "",
    });
    setSelectedOption("");
  } catch (error) {
    console.error("Error creating user:", error);
    setErrorMessage("Det gick inte att skapa användaren. Försök igen.");
  }
};
