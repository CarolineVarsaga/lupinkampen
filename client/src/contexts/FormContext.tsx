import { createContext, useState, ReactNode } from "react";
import { IForm, IFormData } from "../models/formModels";

export const FormContext = createContext<IForm | undefined>(undefined);

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
