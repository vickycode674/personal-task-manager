"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTasks, fetchProjects } from "@/lib/api";
import { useUserStore } from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TaskList from "@/app/frontend/dashboard/components/TaskList";

export default function Dashboard() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/frontend/login");
    }
  }, [user, router]);

  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled: !!user,
  });

  const { data: projects, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: !!user,
  });

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🚀 Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      {tasksLoading || projectsLoading ? (
        <p className="text-gray-500 mt-4 text-center text-lg">⏳ Loading...</p>
      ) : (
        <>
          {tasksError && <p className="text-red-500">❌ Failed to load tasks!</p>}
          {projectsError && <p className="text-red-500">❌ Failed to load projects!</p>}

          {/* Projects Section */}
          <h2 className="text-xl font-semibold text-gray-700 mb-3">📂 Your Projects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects?.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="p-4 bg-white shadow-md rounded-lg border-l-4 border-purple-500 hover:scale-105 transition">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">🔗 Project ID: {project.id}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">🚀 No projects available.</p>
            )}
          </div>

          {/* Tasks Section */}
          <TaskList tasks={tasks?.tasks || []} />
        </>
      )}
    </div>
  );
}
