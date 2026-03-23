import axios from "axios";

export const getSalesmen = async () => {
  const response = await axios.get("/api/v1/salesman/get-all-salesmen");
  return response.data;
};
