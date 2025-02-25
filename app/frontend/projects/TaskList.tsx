"use client";
import { useState } from "react";
import { deleteTask } from "@/app/api/task";

import TaskForm from "@/app/frontend/tasks/TaskForm";

export default function TaskList({ tasks, selectedProject, onDeleteTask }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-700">Tasks</h2>
        {/* <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
        >
          ➕ Add Task
        </button> */}
      </div>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-gray-50 shadow rounded-md flex flex-col justify-between border border-gray-200"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  📌 {task.title}
                </h3>

                <p className="text-gray-700 text-sm mt-1 truncate">
                  📝 <span className="italic">{task.description || "No description provided"}</span>
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  🗓 <span className="font-medium">Due Date:</span> {new Date(task.due_date).toLocaleDateString("en-GB")}
                </p>

                <p
                  className={`text-sm font-semibold mt-1 flex items-center ${task.priority === "High"
                      ? "text-red-600"
                      : task.priority === "Medium"
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                >
                  ⚡ <span className="ml-1">{task.priority} Priority</span>
                </p>
              </div>


              <button
                onClick={() => deleteTask(task.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition self-end"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">🚀 No tasks available.</p>
      )}

      {showForm && (
        <div className="mt-4">
          <TaskForm selectedProject={selectedProject} onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
}
