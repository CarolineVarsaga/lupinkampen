import useSpeciesData from "../../hooks/useSpeciesData";

const LupinInformation = () => {
  const { lupinsInfo, error, fetched } = useSpeciesData();

  if (!fetched) return <p>Hämtar lupininformation...</p>;
  if (error) return <p>Fel vid hämtning av lupininformation: {error}</p>;
  if (lupinsInfo.length === 0) {
    return <p>Inga lupiner hittades.</p>;
  }

  return (
    <>
      {lupinsInfo.map((lupin, index) => {
        return (
          <div key={index} className="lupin-information">
            <h3>Kännetecken {lupin.swedishName}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: lupin.speciesData.speciesFactText.characteristicAsHtml,
              }}
            />
            <h3>Utbredning</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: lupin.speciesData.speciesFactText.spreadAndStatusAsHtml,
              }}
            />
            <h3>Ekologi</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: lupin.speciesData.speciesFactText.ecologyAsHtml,
              }}
            />
            <h3>Hot</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: lupin.speciesData.speciesFactText.threatAsHtml,
              }}
            />
            <h3>Åtgärder</h3>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  lupin.speciesData.speciesFactText.conservationMeasuresAsHtml,
              }}
            />
            <p>Källa: Artfakta.se, SLU</p>
          </div>
        );
      })}
    </>
  );
};

export default LupinInformation;
