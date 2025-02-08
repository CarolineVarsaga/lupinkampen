import LupinInformation from "./LupinInformation";
import BeginHereButton from "../buttons/BeginHereButton";

const MiddleSection = () => {
  return (
    <>
      <section className="infopage-middle-section">
        <LupinInformation />

        <div className="image-container">
          <h3>Hur man tar bort blomsterlupin</h3>

          <iframe
            className="youtube"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/uQ_HACde_Z4?si=TvQUnPOwYzhjOfxj"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p>Informationsvideo från Naturskyddsföreningen</p>
          <div className="button-container">
            <BeginHereButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default MiddleSection;
