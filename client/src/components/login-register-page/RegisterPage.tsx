import FormRegister from "./form/FormRegister";
import BackButton from "../buttons/BackButton";
import SEO from "../SEO";

const RegisterPage = () => {
  return (
    <>
      <SEO
        title="Registrera konto - Lupinkampen"
        description="Skapa ett konto och var med i Lupinkampen idag!"
        url="https://lupinkampen.vercel.app/#/registrera"
      />
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
