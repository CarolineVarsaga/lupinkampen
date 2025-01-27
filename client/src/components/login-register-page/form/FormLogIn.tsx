import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../../services/auth";
import { useAuth } from "../../../hooks/useAuth";
import LogInButton from "../../buttons/LogInButton";

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
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginUser = async () => {
    try {
      const response = await loginService(formData.username, formData.password);

      if (response && response.token && response.user && response.expiresIn) {
        const { token, user, expiresIn } = response;

        login(user, token, expiresIn);

        setSuccessMessage("Inloggad!");
        setErrorMessage(null);

        navigate(`/profil/${user}`, { replace: true });
      } else {
        throw new Error("Inloggning misslyckades. Försök igen.");
      }
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage(
        error instanceof Error ? error.message : "Ett okänt fel inträffade"
      );
    }
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
    loginUser();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <InputField
        forLabel="username"
        label="Användarnamn"
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required={true}
      />
      <InputField
        forLabel="password"
        label="Lösenord"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required={true}
      />
      <LogInButton />
    </form>
  );
};

export default FormLogIn;
