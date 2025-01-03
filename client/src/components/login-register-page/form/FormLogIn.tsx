import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";

interface IFormData {
  username: string;
  password: string;
}

const FormLogIn = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });

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
    <form className="login-form" onSubmit={handleSubmit}>
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

      <button type="submit" className="login-button">
        Logga in
      </button>
    </form>
  );
};

export default FormLogIn;
