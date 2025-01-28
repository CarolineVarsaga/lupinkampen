import RegisterLupinsButton from "../buttons/RegisterLupinsButton";
import LeaderboardButton from "../buttons/LeaderboardButton";

interface IUserActivitySectionProps {
  totalLupins: number;
  recentlyPickedLupins: number;
  userPlacementMunicipality: number | null;
  userPlacementSweden: number | null;
  userId: string;
  loading: boolean;
}

const UserActivitySection = ({
  totalLupins,
  recentlyPickedLupins,
  userPlacementMunicipality,
  userPlacementSweden,
  userId,
}: IUserActivitySectionProps) => (
  <div className="userpage-content-container">
    <h3>Aktivitet</h3>
    <p>Antal plockade lupiner: {totalLupins} st</p>
    <p>Senast plockade: {recentlyPickedLupins} st</p>
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
