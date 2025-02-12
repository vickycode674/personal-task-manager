interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
  console.log("🔥 RAW tasks data:", tasks); // Debug log

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">📌 Your Tasks</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-lg shadow-md transition transform hover:scale-105 ${
                task.completed ? "bg-green-100 border-l-4 border-green-500" : "bg-white border-l-4 border-blue-500"
              }`}
            >
              <h3 className="font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {task.completed ? "✅ Completed" : "⏳ In Progress"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">🚀 No tasks available.</p>
        )}
      </div>
    </div>
  );
}
