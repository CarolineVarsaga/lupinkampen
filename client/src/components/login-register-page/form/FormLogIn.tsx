import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";
import axios from "axios";

interface IFormData {
  username: string;
  password: string;
}

const FormLogIn = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        userName: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        setSuccessMessage("Inloggad!");
        setErrorMessage(null);
        console.log("User ID:", response.data.user);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Fel användarnamn eller lösenord.");
        } else {
          setErrorMessage("Något gick fel. Försök igen senare.");
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message || "Ett okänt fel inträffade.");
      } else {
        setErrorMessage("Ett okänt fel inträffade.");
      }
      setSuccessMessage(null);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
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
      <button type="submit" className="login-button">
        Logga in
      </button>
    </form>
  );
};

export default FormLogIn;
