import axios from "axios";

export const fetchProjects = async () => {
  const response = await axios.get("/api/projects");
  return response.data;
};
