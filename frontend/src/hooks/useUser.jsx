import { register as registerApi, login as loginApi, logout as logoutApi, getme as getmeApi } from "../api/auth";

export const useUser = () => {
  const registerUser = async (formData) => {
    try {
      const data = await registerApi(formData);
      return data;
    } catch (error) {
      console.log("error in registerUser function", error);
      const message = error.response?.data?.message || "Registration failed";
      return { message };
    }
  }

  const loginUser = async (formData) => {
    try {
      const data = await loginApi(formData);
      return data;
    } catch (error) {
      console.log("error in loginUser function", error);
      const message = error.response?.data?.message || "Login failed";
      return { message };
    }
  }
  const logoutUser = async () => {
    try {
      const data = await logoutApi();
      return data;
    } catch (error) {
      console.log("error in logoutUser function", error);
      return { message: "Logout failed" };
    }
  }
  const getMe = async () => {
    try {
      const data = await getmeApi();
      return data;
    } catch (error) {
      console.log("error in getme function", error);
      return null;
    }
  }

  return { registerUser, loginUser, logoutUser, getMe };

}