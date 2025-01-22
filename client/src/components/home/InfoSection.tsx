import ReadMoreButton from "../buttons/ReadMoreButton";

const InfoSection = () => {
  return (
    <section className="info-section">
      <h3 className="info-heading">Invasiv art</h3>
      <p className="info-text">
        Lupiner är en invasiv art som utgör ett allvarligt hot mot den svenska
        naturen. De tränger undan inhemska växter genom att konkurrera om
        resurser som näring, vatten och ljus, vilket leder till att
        biodiversiteten minskar. Lupiner sprider sig snabbt och kan etablera sig
        i stora områden, vilket gör att de förändrar hela ekosystem och påverkar
        både växt- och djurliv negativt.
      </p>
      <p className="info-text">
        För att skydda den biologiska mångfalden och bevara våra ekosystem är
        det viktigt att vi bekämpar lupiner. Genom att aktivt ta bort lupiner
        från marker och naturreservat kan vi ge plats för inhemska växter att
        återhämta sig och bidra till att återställa balansen i vår natur.
      </p>
      <ReadMoreButton />
    </section>
  );
};

export default InfoSection;
