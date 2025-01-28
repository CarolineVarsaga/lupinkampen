import BackButton from "../components/buttons/BackButton";
import BeginHereButton from "../components/buttons/BeginHereButton";
import SEO from "../components/SEO";
const AboutPage = () => {
  return (
    <>
      <SEO
        title="Om Lupinkampen - Lupinkampen"
        description="Om Lupinkampen"
        url="https://lupinkampen.vercel.app/#/om-lupinkampen"
      />
      <section className="about-page">
        <BackButton className="about-back-button" />
        <div className="about-container">
          <div className="about-heading">
            <h2>Om Lupinkampen</h2>
          </div>
          <p>
            Lupinkampen är en rolig och engagerande tävling där deltagarna
            tävlar om att plocka och registrera lupiner för att hjälpa till att
            bekämpa denna invasiva växtart. Deltagandet är helt kostnadsfritt
            och öppet för alla som vill bidra till att skydda den svenska
            naturen.
          </p>
          <div>
            <h3>Hur fungerar Lupinkampen?</h3>
            <p>
              Deltagarna samlar lupiner, registrerar sina insamlade mängder och
              ser hur de rankas mot andra användare och kommuner. Genom att
              hålla koll på hur många lupiner man plockat kan man ständigt
              utmana sina egna och andras rekord.
            </p>
          </div>
          <div>
            <h3>Tävla mot andra</h3>
            <p>
              I Lupinkampen kan du tävla mot andra användare och kommuner,
              vilket gör det hela ännu roligare och mer engagerande. Du kan se
              din egen position på topplistan och sträva efter att komma högre
              upp. Varje gång du samlar och registrerar lupiner får du poäng,
              och du får dessutom chans att vinna medaljer för dina insatser.
            </p>
          </div>
          <div>
            <h3>Tjäna medaljer</h3>
            <p>
              Som en extra motivationsfaktor kan du samla på dig medaljer
              beroende på hur mycket du har plockat och registrerat. Medaljerna
              är en erkännande för ditt engagemang och kan vara ett sätt att
              visa upp dina prestationer.
            </p>
          </div>
          <div>
            <h3>Alla kan vara med</h3>
            <p>
              Det bästa med Lupinkampen är att det inte kostar något att delta.
              Alla, oavsett erfarenhet eller geografisk plats, kan vara med och
              hjälpa till att minska spridningen av lupiner och bidra till en
              sundare och mer biologisk mångfald i Sverige. Så varför inte ge
              dig ut och börja samla lupiner? Tävla, ha kul och gör en insats
              för miljön samtidigt!
            </p>
          </div>
          <BeginHereButton className="about-begin-here-button" />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
