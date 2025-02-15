import axios from "axios";

export const fetchProjects = async () => {
  const response = await axios.get("/api/projects/list");
  return response.data;
};
