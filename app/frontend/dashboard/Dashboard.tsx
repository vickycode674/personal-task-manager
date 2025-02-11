"use client";
import { useTaskStore } from "@/app/store/useTaskStore";
import { useProjectStore } from "@/app/store/useProjectStore";
import { useFetchData } from "@/app/hooks/useFetchData";
// import { useEffect } from "react";

export default function Dashboard() {
  useFetchData(); // Fetch API data on component mount

  const { tasks } = useTaskStore();
  const { projects } = useProjectStore();

  return (
    <div>
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Projects */}
      <h2 className="mt-4 font-semibold">Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>

      {/* Tasks */}
      <h2 className="mt-4 font-semibold">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title} - {task.priority}</li>
        ))}
      </ul>
    </div>
  );
}
