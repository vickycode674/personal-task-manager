"use client";

import { useParams } from "next/navigation";

export default function NewTaskPage() {
  const params = useParams();
  const projectId = params.id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-lg max-w-md">
        <h1 className="text-2xl font-bold text-gray-800">Add New Task</h1>
        <p className="text-gray-600">For Project ID: {projectId}</p>

        <input
          type="text"
          placeholder="Enter Task Name"
          className="mt-4 p-2 w-full border rounded-md"
        />
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          ✅ Save Task
        </button>
      </div>
    </div>
  );
}
