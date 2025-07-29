interface IUserProfileSectionProps {
  userName: string;
  userId: string;
  profileImage: string | null;
  municipalityName: string | null;
}

const breakTextEveryNChars = (text: string, n: number) => {
  const result = [];
  for (let i = 0; i < text.length; i += n) {
    result.push(text.slice(i, i + n));
  }
  return result.map((chunk, idx) => (
    <span key={idx}>
      {chunk}
      {idx < result.length - 1 && <wbr />}
    </span>
  ));
};

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
      <h2 className="username">{breakTextEveryNChars(userName, 12)}</h2>
      <p className="userpage-member-number">Medlemsnummer: {userId}</p>
      <p>Kommun: {municipalityName}</p>
    </div>
  </div>
);

export default UserProfileSection;
