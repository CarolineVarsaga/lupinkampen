import axios from "axios";
import { IForm } from "../../../models/formModels";
import { baseURL } from "../../../utils/baseUrl";

export const submitForm = async ({
  formData,
  selectedOption,
  setFormData,
  setSelectedOption,
  setErrorMessage,
}: IForm) => {
  try {
    const response = await axios.post(`${baseURL}/api/users/create`, {
      userName: formData.username,
      email: formData.email,
      password: formData.password,
      userMunicipality: selectedOption,
    });

    console.log("User created successfully:", response.data);
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
