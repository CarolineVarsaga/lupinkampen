import { ChangeEvent, FormEvent, useState } from "react";

interface IFormData {
  username: string;
  password: string;
}

const LoginForm = () => {
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
      <h3>Logga in</h3>
      <label htmlFor="username">
        Användarnamn
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="password">
        Lösenord
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="login-button">
        Logga in
      </button>
    </form>
  );
};

export default LoginForm;
