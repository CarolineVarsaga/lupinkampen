import LoginForm from "../components/login-register-page/LogInForm";

const LogInRegisterPage = () => {
  return (
    <section className="login-page">
      <a className="link-back">Tillbaka till startsidan</a>
      <div className="log-in-form">
        <LoginForm />
        <a className="register-link">Inte medlem? Registrera ett konto</a>
      </div>
    </section>
  );
};

export default LogInRegisterPage;
