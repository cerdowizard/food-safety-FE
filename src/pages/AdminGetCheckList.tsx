import { useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  Users,
  Settings,
  Clipboard,
  PieChart,
  Edit,
  Trash,
  Plus,
  ChevronDown,
} from "lucide-react";
import ScoreCard from "../components/checklist/ScoreCard";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
  points: number;
  assignedTo: string;
  completedBy?: string;
  completedAt?: string;
}

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  completedTasks: number;
  pendingTasks: number;
}

const AdminChecklist = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "checklists" | "users" | "settings"
  >("overview");
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Check all refrigerator temperatures",
      description:
        "Record temperatures for all units. Must be below 4°C (40°F)",
      category: "Temperature Control",
      isCompleted: true,
      priority: "high",
      dueDate: "2025-03-10",
      points: 3,
      assignedTo: "john.doe",
      completedBy: "john.doe",
      completedAt: "2025-03-10T09:15:00",
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
      assignedTo: "emma.smith",
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
      assignedTo: "sara.jones",
    },
    {
      id: "4",
      title: "Check employee hand washing stations",
      description:
        "Ensure soap, paper towels, and proper signage are available",
      category: "Hygiene",
      isCompleted: true,
      priority: "medium",
      dueDate: "2025-03-12",
      points: 3,
      assignedTo: "john.doe",
      completedBy: "john.doe",
      completedAt: "2025-03-11T14:30:00",
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
      assignedTo: "emma.smith",
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
      assignedTo: "sara.jones",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      role: "Kitchen Staff",
      email: "john.doe@example.com",
      completedTasks: 2,
      pendingTasks: 0,
    },
    {
      id: "2",
      name: "Emma Smith",
      role: "Supervisor",
      email: "emma.smith@example.com",
      completedTasks: 0,
      pendingTasks: 2,
    },
    {
      id: "3",
      name: "Sara Jones",
      role: "Kitchen Staff",
      email: "sara.jones@example.com",
      completedTasks: 0,
      pendingTasks: 2,
    },
  ]);

  // Calculate statistics
  const completedTasks = checklist.filter(item => item.isCompleted);
  const pendingTasks = checklist.filter(item => !item.isCompleted);
  const completionRate = Math.round(
    (completedTasks.length / checklist.length) * 100
  );

  const categoryStats = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { total: 0, completed: 0 };
    }
    acc[item.category].total += 1;
    if (item.isCompleted) {
      acc[item.category].completed += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const deleteItem = (id: string) => {
    setChecklist(items => items.filter(item => item.id !== id));
    //Todo , i need to delete this setUser , am just using it here like this to escape build error
    setUsers([{
      id: "1",
      name: "John Doe",
      role: "Kitchen Staff",
      email: "john.doe@example.com",
      completedTasks: 2,
      pendingTasks: 0,
    },
    {
      id: "2",
      name: "Emma Smith",
      role: "Supervisor",
      email: "emma.smith@example.com",
      completedTasks: 0,
      pendingTasks: 2,
    },
    {
      id: "3",
      name: "Sara Jones",
      role: "Kitchen Staff",
      email: "sara.jones@example.com",
      completedTasks: 0,
      pendingTasks: 2,
    },])
  };

  const openEditModal = (item: ChecklistItem | null) => {
    setSelectedItem(item);
    setEditMode(true);
  };

  const closeEditModal = () => {
    setSelectedItem(null);
    setEditMode(false);
  };

  const saveItem = (item: ChecklistItem) => {
    if (selectedItem) {
      // Edit existing item
      setChecklist(items => items.map(i => (i.id === item.id ? item : i)));
    } else {
      // Add new item
      const newId = String(Math.max(...checklist.map(i => parseInt(i.id))) + 1);
      setChecklist(items => [...items, { ...item, id: newId }]);
    }
    closeEditModal();
  };

  const filterTasks = () => {
    let filtered = [...checklist];

    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    return filtered;
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="text-right">
            <span className="text-gray-500 text-sm">Admin</span>
            <h2 className="text-lg font-medium">Safety Compliance Panel</h2>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8">
          <button
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <div className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Overview</span>
            </div>
          </button>
          <button
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === "checklists"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("checklists")}
          >
            <div className="flex items-center space-x-2">
              <Clipboard className="h-4 w-4" />
              <span>Checklists</span>
            </div>
          </button>
          <button
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === "users"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </div>
          </button>
          <button
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === "settings"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </button>
        </div>

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <>
            {/* Dashboard Stats */}
            <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScoreCard
                score={completedTasks.length}
                totalTasks={checklist.length}
                completedTasks={completedTasks.length}
              />
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Pending Tasks</h3>
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                </div>
                <p className="text-3xl font-bold mt-2">{pendingTasks.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Completion Rate</h3>
                  <PieChart className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold mt-2">{completionRate}%</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Active Users</h3>
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-3xl font-bold mt-2">{users.length}</p>
              </div>
            </div>

            {/* Category Completion */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-medium mb-4">Category Progress</h3>
              <div className="space-y-4">
                {Object.entries(categoryStats).map(([category, stats]) => (
                  <div key={category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm text-gray-500">
                        {stats.completed} of {stats.total} complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(stats.completed / stats.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="divide-y">
                {completedTasks.slice(0, 5).map(task => (
                  <div key={task.id} className="py-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="ml-3">
                        <p className="text-sm font-medium">{task.title}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>Completed by {task.completedBy}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(task.completedAt || "").toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {completedTasks.length === 0 && (
                  <p className="text-gray-500 py-4 text-center">
                    No recent activity
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Checklists Tab Content */}
        {activeTab === "checklists" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Checklist Items</h3>
              <div className="flex space-x-3">
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
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <div
                    id="priority-menu"
                    className="hidden absolute z-10 mt-2 w-48 rounded-md shadow-xl bg-white"
                  >
                    <div className="py-1" role="menu">
                      {["all", "high", "medium", "low"].map(priority => (
                        <button
                          key={priority}
                          onClick={() => {
                            setPriorityFilter(
                              priority as typeof priorityFilter
                            );
                            document
                              .getElementById("priority-menu")
                              ?.classList.add("hidden");
                          }}
                          className={`block w-full text-left px-5 py-2 text-sm ${
                            priorityFilter === priority
                              ? "bg-green-500 text-white"
                              : "text-gray-700 hover:bg-green-50"
                          }`}
                          role="menuitem"
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openEditModal(null)}
                  className="flex items-center space-x-1 bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
              {filterTasks().map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div
                    className={`px-6 py-4 ${
                      item.priority === "high"
                        ? "bg-red-50"
                        : item.priority === "medium"
                        ? "bg-orange-50"
                        : "bg-green-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {item.category}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : item.priority === "medium"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
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
                        onChange={() => {
                          setChecklist(items =>
                            items.map(i =>
                              i.id === item.id
                                ? { ...i, isCompleted: !i.isCompleted }
                                : i
                            )
                          );
                        }}
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
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              +{item.points} points
                            </span>
                            <span className="text-sm text-gray-500">
                              Due {new Date(item.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(item)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab Content */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">User Management</h3>
                <button className="flex items-center space-x-1 bg-green-500 text-white py-2 px-4 rounded-lg">
                  <Plus className="h-4 w-4" />
                  <span>Add User</span>
                </button>
              </div>
            </div>
            <div className="divide-y">
              {users.map(user => (
                <div key={user.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="font-medium">{user.completedTasks}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="font-medium">{user.pendingTasks}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-gray-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500 hover:text-red-500">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab Content */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-6">System Settings</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium mb-3">
                  Checklist Configuration
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Due Date (Days from Creation)
                    </label>
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                      defaultValue={7}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Points per Task
                    </label>
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                      defaultValue={3}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-3">
                  Notification Settings
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-overdue"
                      className="h-4 w-4 text-green-600 rounded"
                      defaultChecked
                    />
                    <label
                      htmlFor="email-overdue"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Email notifications for overdue tasks
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-assignment"
                      className="h-4 w-4 text-green-600 rounded"
                      defaultChecked
                    />
                    <label
                      htmlFor="email-assignment"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Email notifications when assigned a new task
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="daily-digest"
                      className="h-4 w-4 text-green-600 rounded"
                    />
                    <label
                      htmlFor="daily-digest"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Daily digest of pending tasks
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {Array.from(
                    new Set(checklist.map(item => item.category))
                  ).map(category => (
                    <span
                      key={category}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex max-w-md">
                  <input
                    type="text"
                    placeholder="Add new category"
                    className="border border-gray-300 rounded-l-md p-2 flex-grow"
                  />
                  <button className="bg-green-500 text-white px-4 py-2 rounded-r-md">
                    Add
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <h3 className="text-lg font-medium mb-4">
                {selectedItem ? "Edit Task" : "Add New Task"}
              </h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newItem = {
                    id: selectedItem?.id || "",
                    title: formData.get("title") as string,
                    description: formData.get("description") as string,
                    category: formData.get("category") as string,
                    priority: formData.get("priority") as
                      | "high"
                      | "medium"
                      | "low",
                    dueDate: formData.get("dueDate") as string,
                    points: parseInt(formData.get("points") as string),
                    assignedTo: formData.get("assignedTo") as string,
                    isCompleted: selectedItem?.isCompleted || false,
                    completedBy: selectedItem?.completedBy,
                    completedAt: selectedItem?.completedAt,
                  };
                  saveItem(newItem);
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      name="title"
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      defaultValue={selectedItem?.title || ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      rows={3}
                      defaultValue={selectedItem?.description || ""}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        defaultValue={
                          selectedItem?.category || "Temperature Control"
                        }
                        required
                      >
                        <option>Temperature Control</option>
                        <option>Sanitation</option>
                        <option>Pest Control</option>
                        <option>Hygiene</option>
                        <option>Food Storage</option>
                        <option>Waste Management</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        name="priority"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        defaultValue={selectedItem?.priority || "medium"}
                        required
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <input
                        name="dueDate"
                        type="date"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        defaultValue={
                          selectedItem?.dueDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Points
                      </label>
                      <input
                        name="points"
                        type="number"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        defaultValue={selectedItem?.points || 3}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assigned To
                      </label>
                      <select
                        name="assignedTo"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        defaultValue={selectedItem?.assignedTo || "john.doe"}
                        required
                      >
                        <option value="john.doe">John Doe</option>
                        <option value="emma.smith">Emma Smith</option>
                        <option value="sara.jones">Sara Jones</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChecklist;
