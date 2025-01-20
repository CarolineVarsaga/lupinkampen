import { medals } from "../../models/Medals";

interface IUserMedals {
  userLupinsPicked: number | null;
}

const getMedalColorClass = (threshold: number) => {
  if (threshold < 5) return "newbee";
  if (threshold < 50) return "beginner";
  if (threshold < 125) return "small";
  if (threshold < 220) return "medium";
  if (threshold < 350) return "large";
  if (threshold < 500) return "expert";
  if (threshold < 800) return "intermediate";
  if (threshold >= 1000) return "queen-bee";
  return "purple";
};

const UserMedals = ({ userLupinsPicked }: IUserMedals) => {
  console.log("User Lupins Picked:", userLupinsPicked);

  const userMedals = medals.filter(
    (medal) => (userLupinsPicked || 0) >= medal.threshold
  );

  return (
    <div className="medals-container">
      {userMedals.length > 0 ? (
        userMedals.map((medal) => (
          <div
            key={medal.name}
            className={`medal ${getMedalColorClass(medal.threshold)}`}
          >
            {medal.icon && <div>{medal.icon}</div>}
            <div className="tooltip">
              <h4 className="tooltip-text">{`${medal.name}`}</h4>
              <p className="tooltip-text amount">{`${medal.threshold} st plockade lupiner`}</p>
              <p className="tooltip-text">{`${medal.message}`} </p>
            </div>
          </div>
        ))
      ) : (
        <p>Inga medaljer ännu.</p>
      )}
    </div>
  );
};

export default UserMedals;
