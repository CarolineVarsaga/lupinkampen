import { Link } from "react-router-dom";
import FormLogIn from "../components/login-register-page/form/FormLogIn";
import BackButton from "../components/buttons/BackButton";
import SEO from "../components/SEO";

const LogInPage = () => {
  return (
    <>
      <SEO
        title="Logga in - Lupinkampen"
        description="Logga in eller skapa ett konto och var med i Lupinkampen!"
        url="https://lupinkampen.vercel.app/#/logga-in"
      />
      <section className="login-page">
        <BackButton className="link-back" />
        <div className="log-in-form">
          <h3>Logga in</h3>
          <FormLogIn />
          <Link to="/registrera" className="register-link">
            Inte medlem? Registrera ett konto
          </Link>
        </div>
      </section>
    </>
  );
};

export default LogInPage;
