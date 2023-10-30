import apiInstance from "./api";

export const getOperations = async () => {
  try {
    const response = await apiInstance.get("/operations");
    return response.data;
  } catch (error) {
    throw error;
  }
};
