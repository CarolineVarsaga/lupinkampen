import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../../services/auth";
import { useAuth } from "../../../hooks/useAuth";

interface IFormData {
  username: string;
  password: string;
}

const FormLogIn = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "Tittut22",
    password: "test1234",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginUser = async () => {
    try {
      const response = await loginService(formData.username, formData.password);

      if (response && response.token && response.user) {
        const { token, user } = response;

        login(user, token);

        setSuccessMessage("Inloggad!");
        setErrorMessage(null);

        console.log("Navigating to profile...");
        navigate(`/profil/${user}`);
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

// import { ChangeEvent, FormEvent, useState } from "react";
// import InputField from "./InputField";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../../services/auth";

// interface IFormData {
//   username: string;
//   password: string;
// }

// const FormLogIn = () => {
//   const [formData, setFormData] = useState<IFormData>({
//     username: "Tittut22",
//     password: "test1234",
//   });
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const loginUser = async () => {
//     try {
//       const { token, user } = (await login(
//         formData.username,
//         formData.password
//       )) as { token: string; user: string };

//       setSuccessMessage("Inloggad!");
//       setErrorMessage(null);
//       console.log("User ID:", user);
//       console.log("Navigating to profile...");
//       navigate(`/profil/${user}`);
//     } catch (error) {
//       setSuccessMessage(null);
//       setErrorMessage(
//         error instanceof Error ? error.message : "Ett okänt fel inträffade"
//       );
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     loginUser();
//   };

//   return (
//     <form className="login-form" onSubmit={handleSubmit}>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <InputField
//         label="Användarnamn"
//         type="text"
//         id="username"
//         name="username"
//         value={formData.username}
//         onChange={handleChange}
//       />
//       <InputField
//         label="Lösenord"
//         type="password"
//         id="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//       />
//       <button type="submit" className="login-button">
//         Logga in
//       </button>
//     </form>
//   );
// };

// export default FormLogIn;
