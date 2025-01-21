import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  return (
    <section className="user-terms">
      <div className="user-terms-container">
        <div className="user-terms-info">
          <h2>Integritetspolicy</h2>
          <p>Senast uppdaterad: 21 januari 2025</p>
          <p>
            Vi på Lupinkampen är måna om att skydda din integritet och
            personliga information. Denna integritetspolicy förklarar hur vi
            samlar in, använder, lagrar och skyddar dina personuppgifter när du
            använder vår tjänst Lupinkampen. Genom att använda vår tjänst
            samtycker du till denna integritetspolicy.
          </p>
        </div>
        <div className="terms-container">
          <div className="terms-paragraph">
            <h3>1. Vilken information samlar vi in?</h3>
            <p>
              Vi samlar in och behandlar viss information om dig för att kunna
              tillhandahålla vår tjänst. Denna information kan delas upp i två
              kategorier:
            </p>
            <h4>Personlig information:</h4>
            <ul className="terms-ul">
              <li>
                <span>Kontoinformation: </span>När du registrerar ett konto på
                vår tjänst samlar vi in information som ditt namn, e-postadress
                och användarnamn.
              </li>
              <li>
                <span>Användardata: </span>När du använder tjänsten, t.ex.
                registrerar lupiner, sparas information om dina aktiviteter.
              </li>
            </ul>
            <h4>Automatiskt insamlad information:</h4>
            <ul className="terms-ul">
              <li>
                <span>Cookies och liknande teknologier: </span>Vi använder
                cookies för att du ska kunna använda tjänsterna på vår
                webbplats. Läs mer om våra cookies i vår{" "}
                <Link to="/policy">cookiepolicy.</Link>
              </li>
            </ul>
          </div>

          <div className="terms-paragraph">
            <h3>2. Hur använder vi din information?</h3>
            <p>Vi använder den insamlade informationen för följande ändamål:</p>
            <ul className="terms-ul">
              <li>
                <span>För att tillhandahålla och förbättra vår tjänst: </span>
                För att säkerställa att du kan använda vår tjänst och förbättra
                din upplevelse.
              </li>
            </ul>
          </div>

          <div className="terms-paragraph">
            <h3>3. Hur lagrar vi din information?</h3>
            <p>
              Vi lagrar den information vi samlar in så länge som det är
              nödvändigt för att uppfylla de syften för vilka den samlades in,
              eller enligt vad som krävs enligt lag. Vi vidtar alla rimliga
              säkerhetsåtgärder för att skydda din information och förhindra
              obehörig åtkomst.
            </p>
          </div>

          <div className="terms-paragraph">
            <h3>4. Delning av information</h3>
            <p>
              Vi säljer inte din personliga information till tredje part. Vi kan
              dock dela din information med tredje parter under följande
              omständigheter:
            </p>
            <ul className="terms-ul">
              <li>
                <span>Tjänsteleverantörer: </span>
                Vi kan dela din information med externa företag som
                tillhandahåller tjänster åt oss (t.ex. hosting eller teknisk
                support). Dessa tjänsteleverantörer får endast använda din
                information för att utföra tjänster åt oss och får inte dela den
                med andra.
              </li>
              <li>
                <span>Lagkrav: </span>
                Vi kan dela din information om det krävs enligt lag, vid
                rättsliga förfaranden eller för att skydda våra rättigheter.
              </li>
            </ul>
          </div>

          <div className="terms-paragraph">
            <h3>5. Ditt val och dina rättigheter</h3>
            <p>Du har rätt att:</p>
            <ul className="terms-ul">
              <li>
                <span>Begära åtkomst till din information: </span>Du kan begära
                information om vilka personuppgifter vi har om dig.
              </li>
              <li>
                <span>Rätta felaktig information: </span>Om vi har felaktig
                information om dig, kan du be oss rätta den.
              </li>
              <li>
                <span>Begära radering: </span>Du kan begära att vi raderar din
                personliga information, med vissa undantag (t.ex. lagliga krav).
              </li>
              <li>
                <span>• Återkalla ditt samtycke: </span>Om vi behandlar dina
                uppgifter baserat på ditt samtycke kan du när som helst
                återkalla det genom att kontakta oss.
              </li>
            </ul>
          </div>

          <div className="terms-paragraph">
            <h3>6. Säkerhet</h3>
            <p>
              Vi använder tekniska och organisatoriska åtgärder för att skydda
              dina personuppgifter från obehörig åtkomst, ändring eller
              radering. Trots dessa åtgärder kan vi inte garantera 100% säkerhet
              för dataöverföringar på internet, men vi strävar efter att
              upprätthålla högsta möjliga säkerhet.
            </p>
          </div>

          <div className="terms-paragraph">
            <h3>7. Tredjepartswebbplatser</h3>
            <p>
              Vår tjänst kan innehålla länkar till tredje parts webbplatser
              eller tjänster som inte är under vår kontroll. Vi ansvarar inte
              för dessa webbplatsers sekretesspolicy eller innehåll. Vi
              rekommenderar att du läser deras integritetspolicyer innan du
              lämnar ut någon personlig information.
            </p>
          </div>

          <div className="terms-paragraph">
            <h3>8. Ändringar av denna integritetspolicy</h3>
            <p>
              Vi kan komma att uppdatera denna integritetspolicy från tid till
              annan. Om vi gör ändringar kommer vi att meddela dig om dessa
              ändringar via vår tjänst. Vi rekommenderar att du regelbundet
              granskar denna policy för att hålla dig informerad om hur vi
              skyddar din information.
            </p>
          </div>

          <div className="terms-paragraph">
            <h3>9. Kontaktinformation</h3>
            <p>
              Om du har några frågor eller funderingar om denna
              integritetspolicy eller hur vi hanterar dina uppgifter, vänligen
              kontakta oss på:
            </p>
            <p>carolinevarsaga@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
