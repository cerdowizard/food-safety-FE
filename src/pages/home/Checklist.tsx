import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import ScoreCard from "../../components/checklist/ScoreCard";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
  points: number;
}

const Checklist = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Check all refrigerator temperatures",
      description:
        "Record temperatures for all units. Must be below 4°C (40°F)",
      category: "Temperature Control",
      isCompleted: false,
      priority: "high",
      dueDate: "2025-03-10",
      points: 3,
    },
    {
      id: "2",
      title: "Sanitize food preparation surfaces",
      description: "Clean and sanitize all prep areas with approved sanitizer",
      category: "Sanitation",
      isCompleted: false,
      priority: "high",
      dueDate: "2025-03-10",
      points: 3,
    },
    {
      id: "3",
      title: "Inspect food storage areas for pests",
      description:
        "Check for signs of pest activity in dry storage and coolers",
      category: "Pest Control",
      isCompleted: false,
      priority: "medium",
      dueDate: "2025-03-15",
      points: 3,
    },
    {
      id: "4",
      title: "Check employee hand washing stations",
      description:
        "Ensure soap, paper towels, and proper signage are available",
      category: "Hygiene",
      isCompleted: false,
      priority: "medium",
      dueDate: "2025-03-12",
      points: 3,
    },
    {
      id: "5",
      title: "Verify food labeling and dating",
      description:
        "Check all stored food items for proper labels and expiry dates",
      category: "Food Storage",
      isCompleted: false,
      priority: "high",
      dueDate: "2025-03-11",
      points: 3,
    },
    {
      id: "6",
      title: "Clean and sanitize waste disposal areas",
      description: "Clean bins, check for proper separation of waste types",
      category: "Waste Management",
      isCompleted: false,
      priority: "medium",
      dueDate: "2025-03-18",
      points: 3,
    },
  ]);

  const [activeTab, setActiveTab] = useState<"todo" | "completed">("todo");

  // Add new state for priority filter
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  const handleCheckItem = (id: string) => {
    const element = document.getElementById(`task-${id}`);
    if (element) {
      element.classList.add("completing");
      setTimeout(() => {
        setChecklist(items =>
          items.map(item =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
          )
        );
      }, 300);
    }
  };

  const completedTasks = checklist.filter(item => item.isCompleted);
  const todoTasks = checklist.filter(item => !item.isCompleted);

  // Calculate score based on completed tasks
  const score = completedTasks.length;

  // Add filterTasks function before the return statement
  const filterTasks = () => {
    let filtered = activeTab === "todo" ? todoTasks : completedTasks;

    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    return filtered;
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Location */}

        {/* Dashboard Overview */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Card */}
          <ScoreCard
            score={score}
            totalTasks={checklist.length}
            completedTasks={completedTasks.length}
          />

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-medium">Recent activity</h3>
            <div className="mt-2 text-gray-700">
              {completedTasks.length > 0 ? (
                <ul className="space-y-2">
                  {completedTasks.slice(0, 3).map(task => (
                    <li key={task.id} className="flex  items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{task.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent activities</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 bg-white px-4 py-2 rounded-lg shadow-sm"
                onClick={() => {
                  const menu = document.getElementById("priority-menu");
                  menu?.classList.toggle("hidden");
                }}
              >
                <span className="text-sm font-medium">
                  {priorityFilter.charAt(0).toUpperCase() +
                    priorityFilter.slice(1)}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                id="priority-menu"
                className="hidden absolute z-10 mt-2 w-48 rounded-md shadow-xl bg-white  ring-opacity-5"
              >
                <div className="py-1" role="menu">
                  {["all", "high", "medium", "low"].map(priority => (
                    <button
                      key={priority}
                      onClick={() => {
                        setPriorityFilter(priority as typeof priorityFilter);
                        document
                          .getElementById("priority-menu")
                          ?.classList.add("hidden");
                      }}
                      className={`block w-full text-left px-5 py-2 text-sm ${
                        priorityFilter === priority
                          ? "bg-green-500 text-white"
                          : "text-gray-700  hover:bg-green-50"
                      }`}
                      role="menuitem"
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                activeTab === "todo"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("todo")}
            >
              To Do
            </button>
            <button
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                activeTab === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Empty State */}
        {activeTab === "completed" && completedTasks.length === 0 && (
          <div className="empty-state flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm">
            <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No completed tasks yet
            </h3>
            <p className="text-gray-500 text-sm">
              Tasks you complete will appear here
            </p>
          </div>
        )}

        {/* Checklist Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {filterTasks().map(item => (
            <div
              id={`task-${item.id}`}
              key={item.id}
              className="task-card bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div
                className={`px-6 py-4 text-white ${
                  item.priority === "high"
                    ? "bg-red-50"
                    : item.priority === "medium"
                    ? "bg-orange-50"
                    : "bg-green-500"
                }`}
              >
                <div className="flex justify-between text-black items-center">
                  <span>{item.category}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full priority-${item.priority}`}
                  >
                    {item.priority} priority
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckItem(item.id)}
                    className="h-5 w-5 mt-1 rounded border-gray-300"
                  />
                  <div className="ml-3 flex-1">
                    <p
                      className={`text-base font-medium ${
                        item.isCompleted
                          ? "text-gray-400 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center space-x-3">
                      <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        +{item.points} points
                      </span>
                      <span className="text-sm text-gray-500">
                        Due {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checklist;
