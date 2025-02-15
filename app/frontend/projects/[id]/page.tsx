"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "@/lib/api";
import { useUserStore } from "@/app/store/useUserStore";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id;
  const { user } = useUserStore();
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [isProjectSet, setIsProjectSet] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("User not logged in");
      return await createProject(user.id, projectName);
    },
    onSuccess: (data) => {
      console.log("Project created:", data);
      setIsProjectSet(true);
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });

  const handleSetProject = async () => {
    if (projectName.trim() !== "") {
      mutation.mutate();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
          {!isProjectSet ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Create New Project</h1>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter Project Name"
                className="mt-4 p-2 w-full border rounded-md"
              />
              <button
                onClick={handleSetProject}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Creating..." : "Create Project"}
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-800">
                Project: {projectName} (ID: {projectId})
              </h1>
              <h2 className="text-lg font-semibold text-gray-700 mt-2">Tasks</h2>

              <ul className="mt-4 space-y-2">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <li key={index} className="p-4 bg-white shadow rounded-md border border-gray-200">
                      {task.name}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No tasks added yet.</p>
                )}
              </ul>

              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Enter Task Name"
                  className="p-2 border rounded-md flex-1"
                />
                <button
                  onClick={() => setTasks([...tasks, { name: newTaskName }])}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                >
                  + Add Task
                </button>
              </div>

              {/* Redirect to another page on clicking the add task button */}
              <div className="mt-4">
                <button
                  onClick={() => router.push(`/projects/${projectId}/add-task`)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
                >
                  Go to Add Task Page
                </button>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
      {/* Footer at the bottom */}
    </div>
  );
}
