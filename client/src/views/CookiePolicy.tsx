import { LiaCookieBiteSolid } from "react-icons/lia";
const CookiePolicy = () => {
  return (
    <section className="cookie-policy">
      <div className="cookie-policy-container">
        <div className="cookie-policy-heading">
          <LiaCookieBiteSolid size={70} />
          <h2>Cookie-policy</h2>
        </div>
        <div>
          <h3>Cookies som används på Lupinkampen</h3>
          <p>
            Vi använder cookies och lokal lagring för att förbättra din
            upplevelse. Ingen spårning eller marknadsföring sker. De cookies som
            används kräver inget samtycke, men vi har valt att redogöra dem
            ändå.
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
        </div>
        <div>
          <h4>Nyckel: token</h4>
          <p>
            Syfte: Ett autentiseringstoken som låter användaren förbli inloggad.
            Detta är nödvändig lagring.
          </p>
        </div>
        <div>
          <h4>Nyckel: userId</h4>
          <p>
            Syfte: Lagrar användarens unika ID för att koppla dem till rätt data
            under inloggningen. Detta är nödvändig lagring.
          </p>
        </div>
        <div>
          <h4>Nyckel: cookiesAccepted</h4>
          <p>
            Syfte: För att komma ihåg användarens knapptryck på cookie-bannern,
            så den inte behöver fråga om cookies varje gång. Detta är nödvändig
            lagring.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;
