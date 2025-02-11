import axios from "axios";

export const fetchTasks = async () => {
  const response = await axios.get("/api/tasks");
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post("/api/tasks/create", task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`/api/tasks/delete/${id}`);
  return response.data;
};
