import axios from "axios";
import { baseURL } from "../utils/baseUrl";

const token = localStorage.getItem("token");

//=======================================================
//===================   EXPORTS   =======================
//=======================================================

export const customAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//=======================================================

export const postRequest = async <T, U>(
  url: string,
  data: T,
  withToken: boolean = false
): Promise<U> => {
  try {
    const headers = withToken
      ? {
          Authorization: `Bearer ${token || ""}`,
        }
      : {};

    const response = await customAxios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${url}:`, error);
    throw error;
  }
};

//=======================================================

export const getRequest = async <T>(
  url: string,
  withToken: boolean = false
): Promise<T> => {
  try {
    const headers = withToken
      ? {
          Authorization: `Bearer ${token || ""}`,
        }
      : {};

    const response = await customAxios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

//======================================================

export const deleteRequest = async <T, U>(
  url: string,
  data: T,
  withToken: boolean = true
): Promise<U> => {
  try {
    const headers = withToken
      ? {
          Authorization: `Bearer ${token || ""}`,
        }
      : {};

    const response = await customAxios.delete(url, { headers, data });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};
