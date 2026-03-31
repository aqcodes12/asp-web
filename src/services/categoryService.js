import axios from "axios";

export const getCategories = async () => {
  const response = await axios.get("/api/v1/category/getPublicCategory");
  const list = response.data?.data || [];
  return Array.isArray(list)
    ? list
        .filter((cat) => cat.status === "ACTIVE")
        .map((cat) => ({
          _id: cat._id,
          id: cat._id,
          name: cat.name_en,
          name_ar: cat.name_ar,
        }))
    : [];
};
