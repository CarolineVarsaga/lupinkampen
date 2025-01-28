import { IUser } from "../../models/IUser";
import Dropdown from "../login-register-page/form/InputDropDown";
import { municipalities } from "../../models/IMunicipality";

interface ITopUsersProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  topUsers: IUser[];
  error: string | null;
  totalLupins: number;
  municipalityLupins: number;
  handleUserClick: (user: IUser) => void;
}

const TopUsers = ({
  selectedOption,
  setSelectedOption,
  topUsers,
  error,
  totalLupins,
  municipalityLupins,
  handleUserClick,
}: ITopUsersProps) => {
  const options = municipalities.map((muni) => ({
    value: muni.municipalityId.toString(),
    label: muni.municipalityName,
  }));

  return (
    <div className="leaderboard-container-top">
      <h3>Användare</h3>
      <Dropdown
        label="Visa användare för:"
        className="leaderboard-users-dropdown"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        options={[{ value: "", label: "Hela Sverige" }, ...options]}
      />
      <p>
        {selectedOption === ""
          ? `Totalt antal plockade lupiner för hela Sverige: ${totalLupins} st`
          : `Totalt antal plockade lupiner för ${
              options.find((option) => option.value === selectedOption)?.label
            }: ${municipalityLupins} st`}{" "}
      </p>

      <div className="result-list">
        {error && topUsers.length === 0 ? (
          <p>{error}</p>
        ) : (
          topUsers.slice(0, 10).map((user, index) => (
            <div className="result-list-line-container" key={index}>
              <span className="result-list-number">{index + 1}.</span>
              <img
                src={user.avatar}
                alt={`${user.userName}'s avatar`}
                width="25"
                className="user-avatar"
              />
              <p
                className="result-list-name"
                onClick={() => handleUserClick(user)}
              >
                {user.userName}{" "}
                <span className="result-list-amount">
                  {user.totalPickedLupins} st
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopUsers;
