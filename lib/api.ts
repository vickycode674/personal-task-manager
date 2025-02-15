import axios from "axios";

const API_URL = "http://localhost:3000/api/"; // Change to your backend URL

export async function fetchProjects(userId) {
    const res = await fetch(`/api/projects/list?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  }
  
  export async function fetchTasks(userId) {
    const res = await fetch(`/api/tasks/list/?userId=${userId}`);
    console.log("here is the response",res);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  }
  
// Create new task
export const createTask = async (taskData: { title: string; projectId: string }) => {
  const { data } = await axios.post(`${API_URL}/tasks/create`, taskData);
  return data;
};

export async function createProject(userId: number, name: string) {
    const response = await fetch("/api/projects/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, name }),
    });
  
    if (!response.ok) throw new Error("Failed to create project");
  
    return response.json();
  }
  
