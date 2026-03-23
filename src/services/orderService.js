import axios from "axios";

export const createOrder = async (orderData) => {
  const response = await axios.post("/api/v1/order/create-order", orderData);
  return response.data;
};
