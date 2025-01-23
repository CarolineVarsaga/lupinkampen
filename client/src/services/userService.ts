import { IUser, IUserWithPlacement } from "../models/IUser";
import { deleteRequest, getRequest, postRequest } from "./baseService";

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

interface IAssignMedalToUserRequest {
  name: string;
}
export const assignMedalToUser = async (userId: string, medal: string) => {
  const data: IAssignMedalToUserRequest = { name: medal };
  try {
    const response = await postRequest(
      `/api/users/medals/${userId}`,
      data,
      true
    );
    return response;
  } catch (error) {
    console.error("Fel vid uppdatering av medaljer:", error);
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
//=======================   DELETE USER   ========================
//================================================================

interface IDeletePayload {
  userId: string;
}

interface IDeleteResponse {
  success: boolean;
  message: string;
}

export const deleteUserService = async (
  userId: string
): Promise<IDeleteResponse> => {
  const url = `api/users/delete/${userId}`;
  const payload: IDeletePayload = { userId };

  return await deleteRequest<IDeletePayload, IDeleteResponse>(url, payload);
};
