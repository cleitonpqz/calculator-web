import axios from "axios";

const API_BASE_PATH = "/auth";

export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CALCULATOR_API_URL}${API_BASE_PATH}/signup`,
      { username, password }
    );
    return { success: response.data.message };
  } catch (error: any) {
    let errorMessage = "Server error";
    if (error && error.response)
      return { errorMessage: error.response.data.message };
    return { errorMessage };
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CALCULATOR_API_URL}${API_BASE_PATH}/signin`,
      { username, password }
    );
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return { success: true };
  } catch (error: any) {
    let errorMessage = "Server error";
    if (error && error.response)
      return { errorMessage: error.response.data.message };
    return { errorMessage };
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
