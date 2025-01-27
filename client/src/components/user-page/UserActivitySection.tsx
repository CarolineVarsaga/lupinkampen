import RegisterLupinsButton from "../buttons/RegisterLupinsButton";
import LeaderboardButton from "../buttons/LeaderboardButton";

interface IUserActivitySectionProps {
  totalLupins: number;
  recentPickedLupins: number;
  userPlacementMunicipality: number | null;
  userPlacementSweden: number | null;
  userId: string;
  loading: boolean;
}

const UserActivitySection = ({
  totalLupins,
  recentPickedLupins,
  userPlacementMunicipality,
  userPlacementSweden,
  userId,
}: IUserActivitySectionProps) => (
  <div className="userpage-content-container">
    <h4>Aktivitet</h4>
    <p>Antal plockade lupiner: {totalLupins} st</p>
    <p>Senast plockade: {recentPickedLupins} st</p>
    <div className="userpage-activity-buttons-container">
      <RegisterLupinsButton userId={userId} />
    </div>
    <hr className="userpage-activity-line" />
    {userPlacementMunicipality !== null && (
      <p>Placering i kommunen: {userPlacementMunicipality}</p>
    )}
    {userPlacementSweden !== null && (
      <p>Placering i Sverige: {userPlacementSweden}</p>
    )}
    <LeaderboardButton className="userpage-activity-button-leaderboard" />
  </div>
);

export default UserActivitySection;
