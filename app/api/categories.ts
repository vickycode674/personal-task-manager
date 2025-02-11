import axios from "axios";

export const fetchCategories = async () => {
  const response = await axios.get("/api/categories/list");
  return response.data;
};
