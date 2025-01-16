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
    const response = await postRequest<
      { userName: string; password: string; userMunicipality: string },
      { message: string }
    >("/api/users/create", {
      userName: formData.username,
      password: formData.password,
      userMunicipality: selectedOption,
    });
    setFormData({
      username: "",
      password: "",
      email: "",
      confirmpassword: "",
      municipality: "",
    });
    setSelectedOption("");

    console.log("User created successfully:", response.message);
  } catch (error) {
    console.error("Error creating user:", error);
    setErrorMessage("Det gick inte att skapa användaren. Försök igen.");
  }
};
