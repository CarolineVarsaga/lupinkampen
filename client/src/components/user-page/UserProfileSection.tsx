interface IUserProfileSectionProps {
  userName: string;
  userId: string;
  profileImage: string | null;
  municipalityName: string | null;
}

const UserProfileSection = ({
  userName,
  userId,
  profileImage,
  municipalityName,
}: IUserProfileSectionProps) => (
  <div className="userpage-username-pic-container">
    <img
      src={profileImage || "/assets/avatar-lupine.png"}
      width={96}
      height={96}
      alt="profilbild"
    />
    <div className="userpage-username-container">
      <h3>{userName}</h3>
      <p className="userpage-member-number">Medlemsnummer: {userId}</p>
      <p>Kommun: {municipalityName}</p>
    </div>
  </div>
);

export default UserProfileSection;
