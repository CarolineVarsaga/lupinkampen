import MiddleSection from "../components/infopage/MiddleSection";
import TopSection from "../components/infopage/TopSection";
import SEO from "../components/SEO";

const LupinesInformation = () => {
  return (
    <>
      <SEO
        title="Information om lupiner - Lupinkampen"
        description="Ett hot mot den svenska floran. Lupiner är en invasiv art som utgör ett allvarligt hot."
        url="https://lupinkampen.vercel.app/#/information"
      />
      <TopSection />
      <MiddleSection />
    </>
  );
};

export default LupinesInformation;
