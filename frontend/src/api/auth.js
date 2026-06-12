import { api } from "./axiosInstance";

export const register = async ({ name, email, password }) => {
  try {
    const response = await api.post("/users/register", {
      name, email, password
    });
    return response.data;
  } catch (error) {
    console.log("error in register api", error);
    throw error;
  }
}

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/users/login", {
      email, password
    });
    return response.data;
  } catch (error) {
    console.log("error in login api", error);
    throw error;
  }
}

export const logout = async () => {
  try {
    const response = await api.get("/users/logout");
    return response.data;
  } catch (error) {
    console.log("error in logout api", error);
    throw error;
  }
}

export const getme = async () => {
  try {
    const response = await api.get("/users/getme");
    return response.data;
  } catch (error) {
    console.log("error in getme api", error);
    throw error;
  }
}
