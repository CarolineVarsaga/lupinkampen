interface IMunicipality {
  municipalityName: string;
  municipalityTotalPickedLupins?: number;
}

interface ITopMunicipalitiesProps {
  topMunicipalities: IMunicipality[];
}

const TopMunicipalities = ({ topMunicipalities }: ITopMunicipalitiesProps) => {
  return (
    <div className="leaderboard-container-top">
      <h4>Kommuner</h4>
      <div className="result-list">
        {topMunicipalities.map((municipality, index) => (
          <div key={index} className="result-list-line-container-municipality">
            <span className="result-list-number">{index + 1}. </span>
            <p className="result-list-name">
              {municipality.municipalityName}
              <span className="result-list-amount">
                {municipality.municipalityTotalPickedLupins ?? 0} st
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMunicipalities;
