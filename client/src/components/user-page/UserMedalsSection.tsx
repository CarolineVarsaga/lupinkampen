import UserMedals from "./UserMedals";

interface IUserMedalsSectionProps {
  totalLupins: number;
}

const UserMedalsSection = ({ totalLupins }: IUserMedalsSectionProps) => (
  <div className="userpage-content-container">
    <h3>Medaljer</h3>
    <p>Plocka lupiner och vinn medaljer!</p>
    <UserMedals userLupinsPicked={totalLupins} />
  </div>
);

export default UserMedalsSection;
