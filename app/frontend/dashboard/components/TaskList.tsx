interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
  console.log("🔥 RAW tasks data:", tasks); // Debug log

  return (
    <div className="mt-4 bg-white shadow-md p-4 rounded-lg">
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-3 border rounded-md transition-all duration-200 flex items-center justify-between ${
                task.completed ? "line-through text-gray-500 bg-gray-100" : "bg-gray-50 hover:bg-gray-200"
              }`}
            >
              <span className="font-medium">{task.title}</span>
              {task.completed && <span className="text-green-500 font-semibold">✔ Done</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4 text-center text-lg">🚀 No tasks available.</p>
      )}
    </div>
  );
}
