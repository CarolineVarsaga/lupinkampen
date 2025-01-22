import FormRegister from "./form/FormRegister";
import BackButton from "../buttons/BackButton";

const RegisterPage = () => {
  return (
    <>
      <section className="register-page">
        <BackButton className="link-back" />
        <div className="register-user-form">
          <h3>Ny användare</h3>
          <FormRegister />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
