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
          <div className="leaderboard-heading">
            <h2>Topplista</h2>
            <img
              src="/assets/leaderboard-bee.svg"
              alt="Ikon av ett bi med krona"
              width={40}
              height={40}
              className="leaderboard-icon"
            />
          </div>
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
