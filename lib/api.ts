import axios from "axios";

const API_URL = "http://localhost:3000/api/"; // Change to your backend URL

// Fetch all tasks
export const fetchTasks = async () => {
  const { data } = await axios.get(`${API_URL}/tasks/list`);
  return data;
};

// Fetch user projects
export const fetchProjects = async () => {
  const { data } = await axios.get(`${API_URL}/projects/list`);
  return data;
};

// Create new task
export const createTask = async (taskData: { title: string; projectId: string }) => {
  const { data } = await axios.post(`${API_URL}/tasks/create`, taskData);
  return data;
};
