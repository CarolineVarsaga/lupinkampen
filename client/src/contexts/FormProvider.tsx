import { ReactNode, useState } from "react";
import { IFormData } from "../models/formModels";
import { FormContext } from "./FormContext";

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
    email: "",
    confirmpassword: "",
    municipality: "",
  });
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        selectedOption,
        setSelectedOption,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
