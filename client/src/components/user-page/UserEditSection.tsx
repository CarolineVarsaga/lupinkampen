import { IUser } from "../../models/IUser";
import EditInformation from "./EditInformation";

interface IUserEditSectionProps {
  userData: IUser;
  municipalityName: string;
  setMunicipalityName: (name: string) => void;
}

const UserEditSection = ({
  userData,
  municipalityName,
  setMunicipalityName,
}: IUserEditSectionProps) => (
  <div className="userpage-content-container">
    <h4>Ändra dina uppgifter</h4>
    <p className="userpage-content-paragraph">
      Fyll endast i dessa om du behöver ändra dina uppgifter.
    </p>
    <EditInformation
      userData={userData}
      municipalityName={municipalityName}
      setMunicipalityName={setMunicipalityName}
    />
  </div>
);

export default UserEditSection;
