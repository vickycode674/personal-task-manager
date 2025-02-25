import axios from "axios";

export const fetchTasks = async () => {
  const response = await axios.get("/api/tasks/list");
  console.log("here is the resposne of taking data from here and there===================",response.data)
  return response.data;
};

export const createTask = async (task) => {
  console.log("coming here to add new task brooooo====================",task);
  const response = await axios.post("/api/tasks/create", task);
  console.log("here is the resposne happening and coming===================",response.data)
  return response.data;
};

export const deleteTask = async (id) => {
  console.log("Welcome to the delete task fucntion====================",id);
  const response = await axios.delete(`/api/tasks/delete/${id}`);
  console.log("here is the resposne happening and coming===================",response.data)
  return response.data;
};
