import { LiaCookieBiteSolid } from "react-icons/lia";
import BackButton from "../components/buttons/BackButton";
import SEO from "../components/SEO";
const CookiePolicy = () => {
  return (
    <>
      <SEO
        title="Cookie Policy - Lupinkampen"
        description="Cookies som används på Lupinkampen"
        url="https://lupinkampen.vercel.app/#/policy"
      />
      <section className="cookie-policy">
        <BackButton className="cookie-back-button" />
        <div className="cookie-policy-container">
          <div className="cookie-policy-heading">
            <LiaCookieBiteSolid size={70} />
            <h2>Cookie-policy</h2>
          </div>
          <div>
            <h3>Cookies som används på Lupinkampen</h3>
            <p>
              Vi använder cookies och lokal lagring för att förbättra din
              upplevelse. Ingen spårning eller marknadsföring sker. De cookies
              som används kräver inget samtycke, men vi har valt att redogöra
              dem ändå.
            </p>
          </div>

          <h3>Lokal lagring / Local storage</h3>
          <div>
            <h4>Nyckel: lupins</h4>
            <p>
              Syfte: Lagrar API-data från SLU - Artdatabanken, för att minska
              antalet API-anrop och förbättra prestandan. Detta är en
              funktionsrelaterad lagring.
            </p>
            <p>Utgår: 1 månad.</p>
          </div>
          <div>
            <h4>Nyckel: token</h4>
            <p>
              Syfte: Ett autentiseringstoken som låter användaren förbli
              inloggad. Detta är nödvändig lagring.
            </p>
            <p>Utgår: 1 timme, eller när användaren loggar ut.</p>
          </div>
          <div>
            <h4>Nyckel: userId</h4>
            <p>
              Syfte: Lagrar användarens unika ID för att koppla dem till rätt
              data under inloggningen. Detta är nödvändig lagring.
            </p>
            <p>Utgår: 1 timme, eller när användaren loggar ut.</p>
          </div>
          <div>
            <h4>Nyckel: userData</h4>
            <p>
              Syfte: Lagrar användarens uppgifter på användarens profilsida. För
              att minska antalet API-anrop och förbättra prestandan. Detta är
              nödvändig lagring.
            </p>
            <p>Utgår: 1 timme, eller när användaren loggar ut</p>
          </div>
          <div>
            <h4>Nyckel: municipalityName</h4>
            <p>
              Syfte: Lagrar användarens kommun på användarens profilsida. För
              att minska antalet API-anrop och förbättra prestandan. Detta är
              nödvändig lagring.
            </p>
            <p>Utgår: 1 timme, eller när användaren loggar ut</p>
          </div>
          <div>
            <h4>Nyckel: cookiesAccepted</h4>
            <p>
              Syfte: För att komma ihåg användarens knapptryck på
              cookie-bannern, så den inte behöver fråga om cookies varje gång.
              Detta är nödvändig lagring.
            </p>
            <p>Utgår: 1 månad.</p>
          </div>
          <div>
            <h4>Nyckel: cookiesExpiration</h4>
            <p>
              Syfte: För att radera cookiesAccepted efter 1 månad. Detta är
              nödvändig lagring.
            </p>
            <p>Utgår: 1 månad.</p>
          </div>
          <div>
            <h4>Nyckel: expiresAt</h4>
            <p>
              Syfte: Används för att lagra den tidpunkt när användarens session,
              inklusive userId, userData, municipalityName och token, ska tas
              bort. Detta gör att vi kan hantera användarens autentisering och
              säkerställa att deras inloggning endast är giltig under en
              specifik tidsperiod. När expiresAt tiden har passerat, raderas
              användarens userId och token automatiskt, vilket innebär att
              användaren behöver logga in på nytt. Denna lagring är nödvändig
              för att skydda användarens information och säkerställa att
              användarens session inte är aktiv längre än vad som är tillåtet
              enligt våra säkerhetsprinciper. Detta är nödvändig lagring.
            </p>
            <p>Utgår: 1 timme, eller när användaren loggar ut.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CookiePolicy;
