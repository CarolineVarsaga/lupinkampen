import { useState } from "react";
import BackButton from "../components/buttons/BackButton";
import LeaderboardContainer from "../components/leaderboard/LeaderboardContainer";
import UserDetailsModal from "../components/leaderboard/UserDetailsModal";
import SwedenMap from "../components/SwedenMap";
import { IUser } from "../models/IUser";
import SEO from "../components/SEO";

const LeaderBoard = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleSetSelectedUser = (user: IUser | null) => {
    setSelectedUser(user);
  };

  return (
    <>
      <SEO
        title="Topplista - Lupinkampen"
        description="Se vilka kommuner och användare som leder Lupinkampen just nu!"
        url="https://lupinkampen.vercel.app/#/topplista"
      />
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
    </>
  );
};

export default LeaderBoard;
