"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTasks, fetchProjects } from "@/lib/api";
import { useUserStore } from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskList from "@/app/frontend/projects/TaskList";
import TaskForm from "@/app/frontend/tasks/TaskForm";
import { deleteTask } from "@/app/api/task";

export default function Dashboard() {
  const { user, logout } = useUserStore();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/frontend/login");
    }
  }, [user, router]);

  const { data: projects, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ["projects", user?.id],  
    queryFn: () => fetchProjects(user?.id),
    enabled: !!user,
  });

  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useQuery({
    queryKey: ["tasks",  user?.id,selectedProject],  
    queryFn: () => fetchTasks(user?.id,selectedProject),
    enabled: !!selectedProject,
  });

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId); // Delete from backend
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Remove from UI
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };


  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🚀 Dashboard</h1>
      </div>

      {tasksLoading || projectsLoading ? (
        <p className="text-gray-500 mt-4 text-center text-lg">⏳ Loading...</p>
      ) : (
        <>
          {tasksError && <p className="text-red-500">❌ Failed to load tasks!</p>}
          {projectsError && <p className="text-red-500">❌ Failed to load projects!</p>}

          {/* Projects Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">📂 Your Projects</h2>
            <button 
              onClick={() => router.push("/frontend/projects/userId")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              ➕ Add Project
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects?.length > 0 ? (
              projects.map((project) => (
                <div 
                  key={project.id} 
                  className={`p-4 bg-white shadow-md rounded-lg border-l-4 cursor-pointer ${
                    selectedProject === project.id ? "border-blue-500" : "border-purple-500"
                  } hover:scale-105 transition`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">🔗 Project ID: {project.id}</p>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center col-span-full">
                🚀 No projects available. 
                <button 
                  onClick={() => router.push("/frontend/projects")}
                  className="ml-2 text-blue-600 underline hover:text-blue-800"
                >
                  Add a project
                </button>
              </div>
            )}
          </div>

          {/* Tasks Section */}
          {selectedProject && (
            <>
              <div className="flex justify-between items-center mt-6">
                <h2 className="text-xl font-semibold text-gray-700">📌 Tasks for Project {selectedProject}</h2>
                <button 
                  onClick={() => setShowTaskForm(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  ➕ Add Task
                </button>
              </div>

              {showTaskForm && (
  <div className="mt-6 p-4 bg-white shadow-lg rounded-lg relative">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-700">Adding new Task</h2>

      {/* CLOSE Button in the Top-Right Corner */}
      <button 
        onClick={() => setShowTaskForm(false)} 
        className="bg-white-500 text-white px-3 py-1 rounded-md hover: transition"
      >
        ❌
      </button>
    </div>

    {/* TaskForm Component */}
    <TaskForm selectedProject={selectedProject} onAddTask={() => setShowTaskForm(false)} />
  </div>
)}


<TaskList tasks={tasks || []}  onDeleteTask={handleDeleteTask}/>

            </>
          )}
        </>
      )}
    </div>
  );
}
