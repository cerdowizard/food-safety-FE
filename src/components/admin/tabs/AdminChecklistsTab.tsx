import { useState } from "react";
import { ChevronDown, Plus, Edit, Trash, User } from "lucide-react";

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


interface AdminChecklistsTabProps {
  checklist: ChecklistItem[];
  setChecklist: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
  openEditModal: (item: ChecklistItem | null) => void;
  deleteItem: (id: string) => void;
  activeTab: string;
}

export const AdminChecklistsTab = ({
    activeTab,
  checklist,
  setChecklist,
  openEditModal,
  deleteItem
}: AdminChecklistsTabProps) => {
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high" | "medium" | "low">("all");


  const filterTasks = () => {
    let filtered = [...checklist];
    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    return filtered;
  };





  return(
    <>
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
                {priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}
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
                      setPriorityFilter(priority as typeof priorityFilter);
                      document.getElementById("priority-menu")?.classList.add("hidden");
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
            {/* Priority Header */}
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

            {/* Task Content */}
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
                    <br/>

                    <div className="text-sm text-right w-full justify-end  text-green-500 flex ">
                        <span className=" flex gap-1 items-center " >
                        <User className="w-4 h-4"/> <span>{item.assignedTo}</span>
                        </span>
                    </div>
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



</>
  );
};

export default AdminChecklistsTab;

