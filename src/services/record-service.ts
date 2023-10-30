import IRecord from "../types/record.type";
import apiInstance from "./api";

const INITIAL_BALANCE = 500;

export const createRecord = async (operation_id: number, amount: number) => {
  try {
    let user_balance;
    const record = await getLatestRecord();
    if (record) {
      user_balance = record.user_balance;
    } else {
      user_balance = INITIAL_BALANCE;
    }
    const response = await apiInstance.post("/records", {
      operation_id,
      amount,
      user_balance,
    });
    return { success: response.data };
  } catch (error: any) {
    let errorMessage = "Server error";
    if (error && error.response) {
      const { message, errors } = error.response.data;
      return { errorMessage: message, errors };
    }
    return { errorMessage };
  }
};

export const getRecords = async (
  page: number = 1,
  per_page: number = 10,
  search: string = ""
) => {
  try {
    const response = await apiInstance.get("/records", {
      params: {
        page,
        per_page,
        search,
      },
    });
    return response;
  } catch (error) {}
};

export const deleteRecord = async (id: number) => {
  try {
    const response = apiInstance.delete(`/records/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

const getLatestRecord = async () => {
  try {
    let response = await apiInstance.get("/records");
    if (!response.data) {
      return null;
    } else {
      if (response.data.pages > response.data.page) {
        response = await apiInstance.get("/records", {
          params: { page: response.data.pages },
        });
      }
      const records: IRecord[] = response.data.records;
      if (records) {
        const sortedRecords = records.sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });
        const latest = sortedRecords.pop();
        const user_balance = latest?.user_balance + "" || "0";
        return { ...latest, user_balance: parseFloat(user_balance) };
      }
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};
