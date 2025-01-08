export interface IFormData {
  username: string;
  password: string;
  email: string;
  confirmpassword: string;
  municipality: string;
}

export interface IForm {
  formData: IFormData;
  selectedOption: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
}
