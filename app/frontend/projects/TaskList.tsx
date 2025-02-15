"use client"
import { useState } from "react";
import TaskForm from "@/app/frontend/tasks/TaskForm";

export default function TaskList({ tasks, onAddTask }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mt-2">Tasks</h2>
      {tasks.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="p-4 bg-white shadow rounded-md border border-gray-200">
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">Due Date: {task.dueDate}</p>
              <p
                className={`text-sm font-semibold ${
                  task.priority === "High"
                    ? "text-red-500"
                    : task.priority === "Medium"
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                Priority: {task.priority}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500 text-center">
          🚀 No tasks available.
          <button onClick={() => setShowForm(true)} className="ml-2 text-blue-600 underline hover:text-blue-800">
            Add a Task
          </button>
        </div>
      )}

      {/* Show TaskForm when clicked */}
      {showForm && <TaskForm onAddTask={onAddTask} />}
    </div>
  );
}
