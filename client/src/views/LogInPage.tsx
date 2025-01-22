import { Link } from "react-router-dom";
import FormLogIn from "../components/login-register-page/form/FormLogIn";
import BackButton from "../components/buttons/BackButton";

const LogInPage = () => {
  return (
    <section className="login-page">
      <BackButton className="link-back" />
      <div className="log-in-form">
        <h3>Logga in</h3>
        <FormLogIn />
        <Link to="/registrera" className="register-link">
          <a className="register-link">Inte medlem? Registrera ett konto</a>
        </Link>
      </div>
    </section>
  );
};

export default LogInPage;
