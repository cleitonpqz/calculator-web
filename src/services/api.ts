import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_CALCULATOR_API_URL,
});

apiInstance.interceptors.request.use(async (config) => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const { accessToken } = JSON.parse(storedUser);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

export default apiInstance;
