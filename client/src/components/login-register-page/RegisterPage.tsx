import { Link } from "react-router-dom";
import FormRegister from "./form/FormRegister";

const RegisterPage = () => {
  return (
    <>
      <section className="register-page">
        <Link to="/logga-in" className="link-back">
          <a className="link-back">Tillbaka till logga in</a>
        </Link>
        <div className="register-user-form">
          <h3>Ny användare</h3>
          <FormRegister />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
