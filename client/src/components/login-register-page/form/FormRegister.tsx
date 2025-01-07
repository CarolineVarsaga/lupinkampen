import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./InputDropDown";
import Checkbox from "./Checkbox";
import { municipalities } from "../../../models/IMunicipalities";

interface IFormData {
  username: string;
  password: string;
  email: string;
  confirmpassword: string;
  municipality: string;
}

const FormRegister = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
    email: "",
    confirmpassword: "",
    municipality: "",
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const options = municipalities.municipality;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <InputField
        label="E-post"
        type="text"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        label="Användarnamn"
        type="text"
        id="username"
        name="usernamne"
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        label="Lösenord"
        type="text"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <InputField
        label="Bekräfta lösenord"
        type="text"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmpassword}
        onChange={handleChange}
      />
      <Dropdown
        label="Kommun"
        className="drop-down"
        value={selectedOption}
        onChange={handleDropdownChange}
        options={options}
      />
      <Checkbox
        className="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        value=""
      />
      <button type="submit" className="register-button">
        Skapa konto
      </button>
    </form>
  );
};

export default FormRegister;
