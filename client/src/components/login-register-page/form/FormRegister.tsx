import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";
import Dropdown from "./InputDropDown";
import Checkbox from "./Checkbox";
import { municipalities } from "../../../models/IMunicipalities";
import axios from "axios";

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
  const [errorMessage, setErrorMessage] = useState("");

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setFormData({
      ...formData,
      municipality: selectedValue,
    });
  };

  const options = municipalities.map((muni) => ({
    value: muni.municipalityId,
    label: muni.municipality,
  }));

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword ||
      !formData.municipality
    ) {
      setErrorMessage("Alla fält måste fyllas i.");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setErrorMessage("Lösenorden matchar inte.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/create", {
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
      alert("Användare skapad!");
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Det gick inte att skapa användaren. Försök igen.");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

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
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        label="Lösenord"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <InputField
        label="Bekräfta lösenord"
        type="password"
        id="confirmPassword"
        name="confirmpassword"
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
