import BackButton from "../components/buttons/BackButton";
import BeginHereButton from "../components/buttons/BeginHereButton";
import SEO from "../components/SEO";
const FAQ = () => {
  return (
    <>
      <SEO
        title="FAQ Frågor och svar - Lupinkampen"
        description="Här hittar du svar på de vanligaste frågorna om Lupinkampen. Om du
            inte hittar svaret på din fråga, tveka inte att kontakta oss!"
        url="https://lupinkampen.vercel.app/#/FAQ"
      />
      <section className="faq-page">
        <BackButton className="faq-back-button" />
        <div className="faq-container">
          <div className="faq-heading">
            <h2>FAQ - Frågor och svar</h2>
          </div>
          <p>
            Här hittar du svar på de vanligaste frågorna om Lupinkampen. Om du
            inte hittar svaret på din fråga, tveka inte att kontakta oss!
          </p>
          <div>
            <h3>1. Vad är Lupinkampen?</h3>
            <p>
              Lupinkampen är en tävling där deltagare samlar och registrerar
              lupiner för att bidra till att bekämpa denna invasiva växtart i
              Sverige. Det är helt kostnadsfritt att delta, och du tävlar mot
              andra användare och kommuner för att samla så många lupiner som
              möjligt.
            </p>
          </div>
          <div>
            <h3>2. Hur kan jag delta i Lupinkampen?</h3>
            <p>
              För att delta behöver du skapa ett konto på vår hemsida, börja
              plocka lupiner och registrera dem via vår plattform. Ju fler
              lupiner du samlar och registrerar, desto högre upp på topplistan
              kommer du att hamna.
            </p>
          </div>
          <div>
            <h3>3. Vad får jag för att delta?</h3>
            <p>
              Genom att delta får du möjlighet att tävla mot andra och vinna
              digitala medaljer baserat på hur mycket du samlar. Du får även
              chansen att se din rankning på topplistorna för både användare och
              kommuner, vilket gör tävlingen både rolig och engagerande!
            </p>
          </div>
          <div>
            <h3>4. Är det gratis att delta?</h3>
            <p>
              Ja! Det är helt gratis att delta i Lupinkampen. Allt du behöver
              göra är att plocka lupiner och registrera dem på vår plattform.
            </p>
          </div>
          <div>
            <h3>5. Hur samlar jag lupiner?</h3>
            <p>
              Du samlar lupiner genom att plocka dem från naturen. När du har
              samlat dem kan du registrera mängden via vår hemsida. Var noga med
              att följa eventuella riktlinjer för att plocka lupiner på ett
              ansvarsfullt sätt.
            </p>
          </div>
          <div>
            <h3>6. Hur registrerar jag mina lupiner?</h3>
            <p>
              När du har plockat lupiner kan du registrera mängden genom att
              logga in på ditt konto och använda registreringsfunktionen. Här
              kan du lägga till antalet lupiner du har samlat och se hur det
              påverkar din rankning.
            </p>
          </div>
          <div>
            <h3>7. Varför är det viktigt att bekämpa lupiner?</h3>
            <p>
              Lupiner är en invasiv växtart som kan ta över svenska ekosystem
              och utkonkurrera inhemska växter. Genom att plocka och registrera
              lupiner hjälper du till att minska deras spridning och bevara den
              biologiska mångfalden i Sverige.
            </p>
          </div>
          <div>
            <h3>8. Hur får jag medaljer?</h3>
            <p>
              Medaljer delas ut baserat på hur mycket lupiner du har samlat. Det
              kan vara olika typer av medaljer för olika prestationer, som att
              samla ett visst antal lupiner. Medaljerna är ett sätt att belöna
              och uppmärksamma dina insatser.
            </p>
          </div>
          <BeginHereButton className="faq-begin-here-button" />
        </div>
      </section>
    </>
  );
};

export default FAQ;
