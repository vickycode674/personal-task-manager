"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

interface Task {
  id: number;
  name: string;
  status: "Pending" | "Completed";
}

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id;
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Design Home Page", status: "Pending" },
    { id: 2, name: "Write API Docs", status: "Completed" },
  ]);

  const handleAddTask = () => {
    const newTask = { id: tasks.length + 1, name: `Task ${tasks.length + 1}`, status: "Pending" };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Project {projectId}</h1>
        <h2 className="text-lg font-semibold text-gray-700 mt-2">Tasks</h2>

        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="p-4 bg-white shadow rounded-md border border-gray-200">
              {task.status === "Completed" ? "✅" : "🔄"} {task.name}
            </li>
          ))}
        </ul>

        <button 
          onClick={handleAddTask} 
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
