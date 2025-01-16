import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { IUser } from "../models/IUser";
import { fetchMunicipalityName } from "../services/municipalityService";
import {
  fetchTotalLupins,
  fetchUserData,
  fetchUserPlacement,
  fetchUserAvatar,
} from "../services/userService";
import { useAuth } from "../hooks/useAuth";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [municipalityName, setMunicipalityName] = useState<string | null>(null);
  const [totalLupins, setTotalLupins] = useState<number | null>(null);
  const [recentPickedLupins, setRecentPickedLupins] = useState<number | null>(
    null
  );
  const [userPlacementMunicipality, setUserPlacementMunicipality] = useState<
    number | null
  >(null);
  const [userPlacementSweden, setUserPlacementSweden] = useState<number | null>(
    null
  );
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { isAuthenticated, userId: loggedInUserId } = useAuth();

  useEffect(() => {
    const stringLoggedInUserId = String(loggedInUserId);

    if (!isAuthenticated) {
      navigate("/logga-in");
      return;
    }

    if (userId !== stringLoggedInUserId) {
      navigate("/logga-in");
      return;
    }

    const fetchUserDataDetails = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const [userDataResponse, avatarUrl] = await Promise.all([
            fetchUserData(userId),
            fetchUserAvatar(userId),
          ]);

          console.log("User Data Response:", userDataResponse);
          console.log("Avatar URL:", avatarUrl);

          setUserData(userDataResponse);
          setProfileImage(avatarUrl);

          const municipalityNameResponse = await fetchMunicipalityName(
            userDataResponse.userMunicipality
          );
          setMunicipalityName(municipalityNameResponse);

          const lupinsResponse = await fetchTotalLupins(userId);
          setTotalLupins(lupinsResponse.totalPickedLupins);
          setRecentPickedLupins(lupinsResponse.recentlyPickedLupins);

          const municipalityPlacementResponse = await fetchUserPlacement(
            userId,
            "municipality"
          );
          setUserPlacementMunicipality(
            municipalityPlacementResponse.userPlacement
          );

          const swedenPlacementResponse = await fetchUserPlacement(
            userId,
            "sweden"
          );
          setUserPlacementSweden(swedenPlacementResponse.userPlacement);
        } catch (error) {
          console.error("Error fetching user profile data:", error);
        }
      } else {
        console.log("No token found");
      }
    };

    fetchUserDataDetails();
  }, [userId, navigate, loggedInUserId, isAuthenticated]);

  const handleClickRegisterLupines = () => {
    navigate(`/profil/${userId}/registrera-lupiner`);
  };

  const handleLeaderboard = () => {
    navigate(`/topplista`);
  };

  return (
    <div>
      {userData ? (
        <section className="userpage">
          <div className="userpage-container">
            <div className="userpage-username-pic-container">
              <img
                src={profileImage || "/assets/profile-pic.png"}
                width={96}
                height={96}
                alt="profilbild"
              />
              <div className="userpage-username-container">
                <h3>{userData.userName}</h3>
                <p className="userpage-member-number">
                  Medlemsnummer: {userData.userId}
                </p>
                <p>Kommun: {municipalityName}</p>
              </div>
            </div>

            <div className="userpage-activity-container">
              <h4>Aktivitet</h4>
              <p>Antal plockade lupiner: {totalLupins} st</p>
              <p>Senast plockade: {recentPickedLupins} st</p>
              <div className="userpage-activity-buttons-container">
                <Button
                  text="Registrera lupiner"
                  onClick={handleClickRegisterLupines}
                />
              </div>
              <hr className="userpage-activity-line" />
              {userPlacementMunicipality !== null && (
                <p>Placering i kommunen: {userPlacementMunicipality}</p>
              )}
              {userPlacementSweden !== null && (
                <p>Placering i Sverige: {userPlacementSweden}</p>
              )}
              <Button
                text="Topplista"
                className="userpage-activity-button-leaderboard"
                onClick={handleLeaderboard}
              />
            </div>

            <div className="userpage-medals-container">
              <h4>Medaljer</h4>
              <p>Plocka lupiner och vinn medaljer!</p>
            </div>

            <div className="userpage-information-container">
              <h4>Information</h4>
              <p>Fyll endast i dessa om du behöver ändra dina uppgifter.</p>
              <Button
                text="Ändra"
                className="userpage-information-button-edit"
              />
            </div>
          </div>
        </section>
      ) : (
        <p>Laddar användardata...</p>
      )}
    </div>
  );
};

export default UserProfile;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import { IUser } from "../models/IUser";
// import { fetchMunicipalityName } from "../services/municipalityService";
// import {
//   fetchTotalLupins,
//   fetchUserData,
//   fetchUserPlacement,
// } from "../services/userService";
// import { useAuth } from "../hooks/useAuth";

// const UserProfile = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [userData, setUserData] = useState<IUser | null>(null);
//   const [municipalityName, setMunicipalityName] = useState<string | null>(null);
//   const [totalLupins, setTotalLupins] = useState<number | null>(null);
//   const [recentPickedLupins, setRecentPickedLupins] = useState<number | null>(
//     null
//   );
//   const [userPlacementMunicipality, setUserPlacementMunicipality] = useState<
//     number | null
//   >(null);
//   const [userPlacementSweden, setUserPlacementSweden] = useState<number | null>(
//     null
//   );
//   const navigate = useNavigate();
//   const { isAuthenticated, userId: loggedInUserId } = useAuth();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/logga-in");
//       return;
//     }

//     if (userId !== loggedInUserId) {
//       navigate("/logga-in");
//       return;
//     }

//     const fetchUserDataDetails = async () => {
//       const token = localStorage.getItem("token");

//       if (token) {
//         try {
//           const userDataResponse = await fetchUserData(userId);
//           setUserData(userDataResponse);

//           const municipalityNameResponse = fetchMunicipalityName(
//             userDataResponse.userMunicipality
//           );
//           setMunicipalityName(municipalityNameResponse);

//           const lupinsResponse = await fetchTotalLupins(userId);
//           setTotalLupins(lupinsResponse.totalPickedLupins);
//           setRecentPickedLupins(lupinsResponse.recentlyPickedLupins);

//           const municipalityPlacementResponse = await fetchUserPlacement(
//             userId,
//             "municipality"
//           );
//           setUserPlacementMunicipality(
//             municipalityPlacementResponse.userPlacement
//           );

//           const swedenPlacementResponse = await fetchUserPlacement(
//             userId,
//             "sweden"
//           );
//           setUserPlacementSweden(swedenPlacementResponse.userPlacement);
//         } catch (error) {
//           console.error("Error fetching user profile data:", error);
//         }
//       } else {
//         console.log("No token found");
//       }
//     };

//     fetchUserDataDetails();
//   }, [userId, navigate, loggedInUserId, isAuthenticated]);

//   const handleClickRegisterLupines = () => {
//     navigate(`/profil/${userId}/registrera-lupiner`);
//   };

//   const handleLeaderboard = () => {
//     navigate(`/topplista`);
//   };

//   return (
//     <div>
//       {userData ? (
//         <section className="userpage">
//           <div className="userpage-container">
//             <div className="userpage-username-pic-container">
//               <img
//                 src="/assets/profile-pic.png"
//                 width={96}
//                 height={96}
//                 alt="profilbild lila med vit blomma"
//               />
//               <div className="userpage-username-container">
//                 <h3>{userData.userName}</h3>
//                 <p className="userpage-member-number">
//                   Medlemsnummer: {userData.userId}
//                 </p>
//                 <p>Kommun: {municipalityName}</p>
//               </div>
//             </div>

//             <div className="userpage-activity-container">
//               <h4>Aktivitet</h4>
//               <p>Antal plockade lupiner: {totalLupins} st</p>
//               <p>Senast plockade: {recentPickedLupins} st</p>
//               <div className="userpage-activity-buttons-container">
//                 <Button
//                   text="Registrera lupiner"
//                   onClick={handleClickRegisterLupines}
//                 />
//               </div>
//               <hr className="userpage-activity-line" />
//               {userPlacementMunicipality !== null && (
//                 <p>Placering i kommunen: {userPlacementMunicipality}</p>
//               )}
//               {userPlacementSweden !== null && (
//                 <p>Placering i Sverige: {userPlacementSweden}</p>
//               )}
//               <Button
//                 text="Topplista"
//                 className="userpage-activity-button-leaderboard"
//                 onClick={handleLeaderboard}
//               />
//             </div>

//             <div className="userpage-medals-container">
//               <h4>Medaljer</h4>
//               <p>Plocka lupiner och vinn medaljer!</p>
//             </div>

//             <div className="userpage-information-container">
//               <h4>Information</h4>
//               <p>Fyll endast i dessa om du behöver ändra dina uppgifter.</p>
//               <Button
//                 text="Ändra"
//                 className="userpage-information-button-edit"
//               />
//             </div>
//           </div>
//         </section>
//       ) : (
//         <p>Laddar användardata...</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
