import axios from "axios";

export const getSalesmen = async () => {
  const response = await axios.get("/api/v1/salesman/getPublicSalesmen");
  return response.data;
};
