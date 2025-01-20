import { IUser, IUserWithPlacement } from "../models/IUser";
import { getRequest, postRequest } from "./baseService";

//================================================================

export const fetchUserData = async (userId: string) => {
  try {
    const response = await getRequest<IUser>(
      `/api/users/getuser/${userId}`,
      true
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//================================================================

export const fetchUserAvatar = async (userId: string) => {
  try {
    const response = await getRequest<IUser>(
      `/api/users/avatar/${userId}`,
      true
    );
    console.log("avatar, userService:", response.avatar);
    return response.avatar;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//================================================================

export const fetchTotalLupins = async (userId: string) => {
  try {
    const response = await getRequest<IUser>(
      `/api/users/getLupins/${userId}`,
      true
    );
    return response;
  } catch (error) {
    console.error("Error fetching total lupins:", error);
    throw error;
  }
};

//================================================================

export const fetchUserPlacement = async (
  userId: string,
  scope: "municipality" | "sweden"
): Promise<IUserWithPlacement> => {
  try {
    const endpoint =
      scope === "municipality"
        ? `/api/users/score/${userId}`
        : `/api/users/scoreSweden/${userId}`;

    const response = await getRequest<IUserWithPlacement>(endpoint, true);
    return response;
  } catch (error) {
    console.error(`Error fetching user placement (${scope}):`, error);
    throw error;
  }
};

//================================================================
//=======================   UPDATE USER   ========================
//================================================================

export const updateUser = async (
  userId: string,
  updates: {
    email?: string;
    password?: string;
    userMunicipality?: string;
    associationId?: string;
  }
) => {
  try {
    const response = await postRequest<
      {
        email?: string;
        password?: string;
        userMunicipality?: string;
        associationId?: string;
      },
      IUser
    >(`/api/users/update/${userId}`, updates, true);
    console.log("update user response:", response);

    return response;
  } catch (error) {
    console.error("Error updating user information", error);
    throw error;
  }
};

//================================================================
