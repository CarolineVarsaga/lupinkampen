import CookieBar from "../components/CookieBar";
import HeroSection from "../components/home/HeroSection";
import InfoSection from "../components/home/InfoSection";
import MapSection from "../components/home/MapSection";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Startsida Lupinkampen - Lupinkampen"
        description="Nu ska lupinerna bort! Var med i kampen du också! Helt kostnadsfritt!"
        url="https://lupinkampen.vercel.app"
      />
      <CookieBar />
      <HeroSection />
      <InfoSection />
      <MapSection />
    </>
  );
};

export default Home;
