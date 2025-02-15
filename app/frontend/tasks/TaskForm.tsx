"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { createTask } from "@/app/api/task"; 

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("Low");

  const queryClient = useQueryClient(); // React Query cache

  // React Query mutation for creating a task
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      // Refetch tasks to update UI with the new task
      queryClient.invalidateQueries(["tasks"]);

      // Optional: Call external handler if needed
      if (onAddTask) {
        onAddTask(newTask);
      }

      // Reset form fields
      setTitle("");
      setDescription("");
      setDueDate(new Date());
      setPriority("Low");
    },
    onError: (error) => {
      alert("Failed to create task: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title is required!");

    // Prepare task data
    const newTask = {
      title,
      description,
      due_date: dueDate.toISOString().split("T")[0], // Formatting date
      priority,
    };

    // Trigger mutation to send data to backend
    mutation.mutate(newTask);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Task Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Task Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-2 border rounded-md"
        />

        {/* Due Date Picker */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Due Date:</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            className="p-2 border rounded-md w-full"
          />
        </div>

        {/* Priority Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟠 Medium</option>
            <option value="High">🔴 High</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "+ Add Task"}
        </button>
      </form>
    </div>
  );
}
