import { useState } from "react";
import BackButton from "../components/buttons/BackButton";
import LeaderboardContainer from "../components/leaderboard/LeaderboardContainer";
import UserDetailsModal from "../components/leaderboard/UserDetailsModal";
import SwedenMap from "../components/SwedenMap";
import { IUser } from "../models/IUser";

const LeaderBoard = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleSetSelectedUser = (user: IUser | null) => {
    setSelectedUser(user);
  };

  return (
    <section className="leaderboard">
      <div className="leaderboard-left-column">
        <BackButton className="leaderboard-back" />
        <h3>Topplista</h3>
        <div className="leaderboard-container">
          <LeaderboardContainer setSelectedUser={handleSetSelectedUser} />
        </div>
      </div>
      <SwedenMap />
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => handleSetSelectedUser(null)}
        />
      )}
    </section>
  );
};

export default LeaderBoard;
