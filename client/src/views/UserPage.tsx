import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { municipalities } from "../models/IMunicipality";
import Button from "../components/Button";

interface IUserData {
  userId: string;
  userName: string;
  email: string;
  userMunicipality: number;
  profilePicture?: string;
}

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [municipalityName, setMunicipalityName] = useState<string | null>(null);
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!loggedInUserId) {
      navigate("/logga-in");
      return;
    }

    if (userId !== loggedInUserId) {
      navigate("/logga-in");
      return;
    }

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:3001/users/getuser/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);

          const municipality = municipalities.find(
            (m) => m.municipalityId === response.data.userMunicipality
          );

          if (municipality) {
            setMunicipalityName(municipality.municipality);
          } else {
            setMunicipalityName("Okänd kommun");
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      } else {
        console.log("Inget token hittades");
      }
    };

    fetchUserData();
  }, [userId, navigate, loggedInUserId]);

  return (
    <div>
      {userData ? (
        <section className="userpage">
          <div className="userpage-username-pic-container">
            <img
              src="/assets/profile-pic.png"
              width={96}
              height={96}
              alt="profilbild lila med vit blomma"
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
            <p>Antal plockade lupiner:</p>
            <p>Senast plockade:</p>
            <div className="userpage-activity-buttons-container">
              <Button text="Visa alla" />
              <Button text="Registrera lupiner" />
            </div>
            <hr className="userpage-activity-line" />
            <p>Placering i kommunen:</p>
            <p>Placering i Sverige:</p>
            <Button
              text="Topplista"
              className="userpage-activity-button-leaderboard"
            />
          </div>

          <div className="userpage-medals-container">
            <h4>Medaljer</h4>
            <p>Plocka lupiner och vinn medaljer!</p>
          </div>

          <div className="userpage-information-container">
            <h4>Information</h4>
            <p>Fyll endast i dessa om du behöver ändra dina uppgifter.</p>
            <Button text="Ändra" className="userpage-information-button-edit" />
          </div>
        </section>
      ) : (
        <p>Laddar användardata...</p>
      )}
    </div>
  );
};

export default UserProfile;
