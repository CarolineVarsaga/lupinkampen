import { useState, useEffect } from "react";
import InputField from "../login-register-page/form/InputField";
import { useFormContext } from "../../hooks/useFormContext";
import { updateUser } from "../../services/userService";
import { FormEvent } from "react";
import { IUser } from "../../models/IUser";
import Dropdown from "../login-register-page/form/InputDropDown";
import { municipalities } from "../../models/IMunicipality";

interface IEditInformationProps {
  userData: IUser;
  municipalityName: string;
}

interface IUpdateFields {
  email?: string;
  password?: string;
  userMunicipality?: string;
}

interface IDropdownOption {
  value: string;
  label: string;
}

const EditInformation = ({
  userData,
  municipalityName,
}: IEditInformationProps) => {
  const { formData, setFormData, selectedOption, setSelectedOption } =
    useFormContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);

  const options = municipalities.map((muni) => ({
    value: muni.municipalityId.toString(),
    label: muni.municipalityName,
  }));

  useEffect(() => {
    setFormData({
      email: userData.email || "",
      password: "",
      confirmpassword: "",
      municipality: userData.userMunicipality.toString(),
      username: userData.userName || "",
    });
  }, [userData, setFormData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirmpassword) {
      setError("Lösenorden matchar inte.");
      setLoading(false);
      return;
    }
    console.log("Checking updates for fields: ", {
      email: formData.email,
      password: formData.password,
      confirmpassword: formData.confirmpassword,
      municipality: formData.municipality,
      username: formData.username,
    });

    if (formData.password && formData.password !== formData.confirmpassword) {
      setError("Lösenorden matchar inte.");
      setLoading(false);
      return;
    }

    const updates: IUpdateFields = {};

    if (formData.email && formData.email !== userData.email) {
      updates.email = formData.email;
    }

    if (formData.password && formData.password !== userData.password) {
      updates.password = formData.password;
    } else if (!formData.password && userData.password) {
      updates.password = userData.password;
    }

    if (
      formData.municipality &&
      Number(formData.municipality) !== userData.userMunicipality
    ) {
      updates.userMunicipality = formData.municipality;
    }

    try {
      const response = await updateUser(String(userData.userId), updates);

      if (response) {
        setSuccessMessage("Dina uppgifter har uppdaterats!");
      }
    } catch (err) {
      setError("Det gick inte att uppdatera dina uppgifter.");
      console.error("Error updating user information:", err);
    } finally {
      setLoading(false);
    }
  };

  const defaultOption: IDropdownOption = {
    value: "",
    label: municipalityName,
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setFormData({
      ...formData,
      municipality: selectedValue,
    });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password" && value !== "") {
      setIsPasswordRequired(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      {error && <p>{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <InputField
        forLabel="email"
        label="E-post"
        type="email"
        id="editEmail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required={false}
      />

      <InputField
        forLabel="new password"
        label="Nytt lösenord"
        type="password"
        id="editPassword"
        name="password"
        value={formData.password}
        onChange={handlePasswordChange}
        required={isPasswordRequired && !formData.confirmpassword}
      />

      <InputField
        forLabel="confirm password"
        label="Bekräfta lösenord"
        type="password"
        id="editPasswordConfirm"
        name="confirmpassword"
        value={formData.confirmpassword}
        onChange={handlePasswordChange}
        required={isPasswordRequired && !formData.confirmpassword}
      />

      <Dropdown
        label="Kommun"
        className="edit-municipality"
        value={selectedOption}
        onChange={handleDropdownChange}
        options={[defaultOption, ...options]}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Uppdaterar..." : "Ändra"}
      </button>
    </form>
  );
};

export default EditInformation;
