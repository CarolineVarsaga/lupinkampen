// import { useEffect, useState } from "react";
// import SwedenMap from "../components/SwedenMap";
// import Dropdown from "../components/login-register-page/form/InputDropDown";
// import { useFormContext } from "../hooks/useFormContext";
// import { municipalities } from "../models/IMunicipality";
// import {
//   fetchTopMunicipalities,
//   fetchTopMunicipalityUsers,
//   fetchTopUsers,
//   fetchTotalLupins,
// } from "../services/leaderboardService";
// import { IUser } from "../models/IUser";
// import { fetchMunicipalityLupins } from "../services/municipalityService";
// import RegisterLupinsButton from "../components/buttons/RegisterLupinsButton";
// import { useParams } from "react-router-dom";
// import BackButton from "../components/buttons/BackButton";
// import UserDetailsModal from "../components/leaderboard/UserDetailsModal";

// interface IMunicipality {
//   municipalityName: string;
//   municipalityTotalPickedLupins: number;
// }

// const LeaderBoard = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [topMunicipalities, setTopMunicipalities] = useState<IMunicipality[]>(
//     []
//   );
//   const [topUsers, setTopUsers] = useState<IUser[]>([]);
//   const [totalLupins, setTotalLupins] = useState<number>(0);
//   const [municipalityLupins, setMunicipalityLupins] = useState<number>(0);
//   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { selectedOption, setSelectedOption, formData, setFormData } =
//     useFormContext();

//   useEffect(() => {
//     setSelectedOption("");

//     const getTopMunicipalities = async () => {
//       try {
//         const data = await fetchTopMunicipalities();
//         const transformedData = data.map((municipality) => ({
//           ...municipality,
//           municipalityTotalPickedLupins:
//             municipality.municipalityTotalPickedLupins ?? 0,
//         }));
//         setTopMunicipalities(transformedData);
//       } catch (err) {
//         setError("Kunde inte hämta topplistan över kommuner.");
//         console.error("Error fetching top municipalities:", err);
//       }
//     };

//     const getTopUsers = async () => {
//       try {
//         const data = await fetchTopUsers();
//         console.log("Fetched top users from API:", data);
//         setTopUsers(data);
//       } catch (err) {
//         setError("Kunde inte hämta topplistan över användare.");
//         console.error("Error fetching top users:", err);
//       }
//     };

//     const getTotalLupins = async () => {
//       try {
//         const data = await fetchTotalLupins();
//         setTotalLupins(data.totalLupins);
//       } catch (err) {
//         setError("Kunde inte hämta totalt antal plockade lupiner.");
//         console.error("Error fetching total lupins:", err);
//       }
//     };

//     const fetchAllData = async () => {
//       setLoading(true);
//       await Promise.all([
//         getTopMunicipalities(),
//         getTopUsers(),
//         getTotalLupins(),
//       ]);
//       setLoading(false);
//     };

//     fetchAllData();
//   }, [setSelectedOption]);

//   const handleDropdownChange = async (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const selectedValue = e.target.value;
//     setSelectedOption(selectedValue);
//     setFormData({
//       ...formData,
//       municipality: selectedValue,
//     });

//     try {
//       if (selectedValue) {
//         const usersOrMessage = await fetchTopMunicipalityUsers(selectedValue);

//         if ("message" in usersOrMessage) {
//           setError(usersOrMessage.message);
//           setTopUsers([]);
//         } else {
//           setTopUsers(usersOrMessage);
//           setError(null);
//         }

//         const municipalityId = parseInt(selectedValue, 10);
//         const lupinsCount = await fetchMunicipalityLupins(municipalityId);
//         setMunicipalityLupins(lupinsCount);
//       } else {
//         const users = await fetchTopUsers();
//         setTopUsers(users);

//         const totalLupinsData = await fetchTotalLupins();
//         setTotalLupins(totalLupinsData.totalLupins);
//         setMunicipalityLupins(0);
//         setError(null);
//       }
//     } catch (err) {
//       setError("Kunde inte hämta data för den valda kommunen.");
//       console.error("Error fetching data for selected municipality:", err);
//     }
//   };

//   const options = municipalities.map((muni) => ({
//     value: muni.municipalityId.toString(),
//     label: muni.municipalityName,
//   }));

//   return (
//     <section className="leaderboard">
//       <div className="leaderboard-left-column">
//         <BackButton className="leaderboard-back" />
//         <h3>Topplista</h3>
//         {loading ? (
//           <p>Laddar...</p>
//         ) : (
//           <div className="leaderboard-container">
//             <div className="leaderboard-container-top">
//               <h4>Kommuner</h4>
//               <div className="result-list">
//                 {topMunicipalities.map((municipality, index) => (
//                   <p key={index} className="result-list-line">
//                     {index + 1}. {municipality.municipalityName}
//                     <span>{municipality.municipalityTotalPickedLupins} st</span>
//                   </p>
//                 ))}
//               </div>
//             </div>
//             <hr />
//             <div className="leaderboard-container-top">
//               <h4>Användare</h4>
//               <Dropdown
//                 label="Visa användare för:"
//                 className="leaderboard-users-dropdown"
//                 value={selectedOption}
//                 onChange={handleDropdownChange}
//                 options={[{ value: "", label: "Hela Sverige" }, ...options]}
//               />
//               <p>
//                 {selectedOption === ""
//                   ? `Totalt antal plockade lupiner för hela Sverige: ${totalLupins} st`
//                   : `Totalt antal plockade lupiner för ${
//                       options.find((option) => option.value === selectedOption)
//                         ?.label
//                     }: ${municipalityLupins} st`}
//               </p>

//               <div className="result-list">
//                 {error && topUsers.length === 0 ? (
//                   <p>{error}</p>
//                 ) : (
//                   topUsers.map((user, index) => (
//                     <>
//                       <div className="result-list-line-container">
//                         {index + 1}.
//                         <img
//                           src={user.avatar}
//                           alt={`${user.userName}'s avatar`}
//                           width="25"
//                           className="user-avatar"
//                         />
//                         <p
//                           key={index}
//                           className="result-list-name"
//                           onClick={() => setSelectedUser(user)}
//                         >
//                           {user.userName}{" "}
//                           <span className="result-list-amount">
//                             {user.totalPickedLupins} st
//                           </span>
//                         </p>
//                       </div>
//                     </>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//         <RegisterLupinsButton userId={userId} />
//       </div>
//       <SwedenMap />
//       {selectedUser && (
//         <UserDetailsModal
//           user={selectedUser}
//           onClose={() => setSelectedUser(null)}
//         />
//       )}
//     </section>
//   );
// };

//export default LeaderBoard;

import { useEffect, useState } from "react";
import SwedenMap from "../components/SwedenMap";
import Dropdown from "../components/login-register-page/form/InputDropDown";
import { useFormContext } from "../hooks/useFormContext";
import { municipalities } from "../models/IMunicipality";
import {
  fetchTopMunicipalities,
  fetchTopMunicipalityUsers,
  fetchTopUsers,
  fetchTotalLupins,
} from "../services/leaderboardService";
import { IUser } from "../models/IUser";
import { fetchMunicipalityLupins } from "../services/municipalityService";
import RegisterLupinsButton from "../components/buttons/RegisterLupinsButton";
import { useParams } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
import UserDetailsModal from "../components/leaderboard/UserDetailsModal";
import { useAuth } from "../hooks/useAuth";

interface IMunicipality {
  municipalityName: string;
  municipalityTotalPickedLupins: number;
}

const LeaderBoard = () => {
  const { userId: loggedInUserId } = useAuth();
  const { userId } = useParams<{ userId: string }>();
  const [topMunicipalities, setTopMunicipalities] = useState<IMunicipality[]>(
    []
  );
  const [topUsers, setTopUsers] = useState<IUser[]>([]);
  const [totalLupins, setTotalLupins] = useState<number>(0);
  const [municipalityLupins, setMunicipalityLupins] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedOption, setSelectedOption, formData, setFormData } =
    useFormContext();

  useEffect(() => {
    setSelectedOption("");

    const getTopMunicipalities = async () => {
      try {
        const data = await fetchTopMunicipalities();
        const transformedData = data.map((municipality) => ({
          ...municipality,
          municipalityTotalPickedLupins:
            municipality.municipalityTotalPickedLupins ?? 0,
        }));
        setTopMunicipalities(transformedData);
      } catch (err) {
        setError("Kunde inte hämta topplistan över kommuner.");
        console.error("Error fetching top municipalities:", err);
      }
    };

    const getTopUsers = async () => {
      try {
        const data = await fetchTopUsers();
        setTopUsers(data);
      } catch (err) {
        setError("Kunde inte hämta topplistan över användare.");
        console.error("Error fetching top users:", err);
      }
    };

    const getTotalLupins = async () => {
      try {
        const data = await fetchTotalLupins();
        setTotalLupins(data.totalLupins);
      } catch (err) {
        setError("Kunde inte hämta totalt antal plockade lupiner.");
        console.error("Error fetching total lupins:", err);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        getTopMunicipalities(),
        getTopUsers(),
        getTotalLupins(),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, [setSelectedOption]);

  const handleDropdownChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setFormData({
      ...formData,
      municipality: selectedValue,
    });

    try {
      if (selectedValue) {
        const usersOrMessage = await fetchTopMunicipalityUsers(selectedValue);

        if ("message" in usersOrMessage) {
          setError(usersOrMessage.message);
          setTopUsers([]);
        } else {
          setTopUsers(usersOrMessage);
          setError(null);
        }

        const municipalityId = parseInt(selectedValue, 10);
        const lupinsCount = await fetchMunicipalityLupins(municipalityId);
        setMunicipalityLupins(lupinsCount);
      } else {
        const users = await fetchTopUsers();
        setTopUsers(users);

        const totalLupinsData = await fetchTotalLupins();
        setTotalLupins(totalLupinsData.totalLupins);
        setMunicipalityLupins(0);
        setError(null);
      }
    } catch (err) {
      setError("Kunde inte hämta data för den valda kommunen.");
      console.error("Error fetching data for selected municipality:", err);
    }
  };

  const options = municipalities.map((muni) => ({
    value: muni.municipalityId.toString(),
    label: muni.municipalityName,
  }));

  const handleUserClick = (user: IUser) => {
    if (loggedInUserId) {
      setSelectedUser(user);
    } else {
      alert("Du måste vara inloggad för att se användardetaljer.");
    }
  };

  return (
    <section className="leaderboard">
      <div className="leaderboard-left-column">
        <BackButton className="leaderboard-back" />
        <h3>Topplista</h3>
        {loading ? (
          <p>Laddar...</p>
        ) : (
          <div className="leaderboard-container">
            <div className="leaderboard-container-top">
              <h4>Kommuner</h4>
              <div className="result-list">
                {topMunicipalities.map((municipality, index) => (
                  <div
                    key={index}
                    className="result-list-line-container-municipality"
                  >
                    <span className="result-list-number">{index + 1}. </span>
                    <p className="result-list-name">
                      {municipality.municipalityName}

                      <span className="result-list-amount">
                        {municipality.municipalityTotalPickedLupins} st
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="leaderboard-container-top">
              <h4>Användare</h4>
              <Dropdown
                label="Visa användare för:"
                className="leaderboard-users-dropdown"
                value={selectedOption}
                onChange={handleDropdownChange}
                options={[{ value: "", label: "Hela Sverige" }, ...options]}
              />
              <p>
                {selectedOption === ""
                  ? `Totalt antal plockade lupiner för hela Sverige: ${totalLupins} st`
                  : `Totalt antal plockade lupiner för ${
                      options.find((option) => option.value === selectedOption)
                        ?.label
                    }: ${municipalityLupins} st`}
              </p>

              <div className="result-list">
                {error && topUsers.length === 0 ? (
                  <p>{error}</p>
                ) : (
                  topUsers.map((user, index) => (
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
          </div>
        )}
        <RegisterLupinsButton userId={userId} />
      </div>
      <SwedenMap />
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </section>
  );
};

export default LeaderBoard;
