import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  points: number;
  dueDate: string;
}

const AdminChecklist = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Check refrigerator temperatures",
      description: "Ensure all units are below 4°C",
      category: "Temperature Control",
      priority: "high",
      points: 3,
      dueDate: "2024-03-20",
    },
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<ChecklistItem>>({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    points: 1,
    dueDate: new Date().toISOString().split("T")[0],
  });

  const handleAddItem = () => {
    if (newItem.title && newItem.description && newItem.category) {
      setItems([
        ...items,
        {
          ...(newItem as ChecklistItem),
          id: Date.now().toString(),
        },
      ]);
      setNewItem({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        points: 1,
        dueDate: new Date().toISOString().split("T")[0],
      });
    }
  };

  const handleEditItem = (id: string) => {
    setIsEditing(id);
  };

  const handleSaveEdit = (id: string) => {
    setIsEditing(id);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Checklist Management
          </h1>
          <button
            onClick={handleAddItem}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </button>
        </div>

        {/* Add New Item Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Add New Checklist Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newItem.title}
              onChange={e => setNewItem({ ...newItem, title: e.target.value })}
              className="border rounded-md px-3 py-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={newItem.category}
              onChange={e =>
                setNewItem({ ...newItem, category: e.target.value })
              }
              className="border rounded-md px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={newItem.description}
              onChange={e =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              className="border rounded-md px-3 py-2 md:col-span-2"
            />
            <select
              value={newItem.priority}
              onChange={e =>
                setNewItem({
                  ...newItem,
                  priority: e.target.value as "high" | "medium" | "low",
                })
              }
              className="border rounded-md px-3 py-2"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <input
              type="number"
              placeholder="Points"
              value={newItem.points}
              onChange={e =>
                setNewItem({ ...newItem, points: parseInt(e.target.value) })
              }
              className="border rounded-md px-3 py-2"
            />
            <input
              type="date"
              value={newItem.dueDate}
              onChange={e =>
                setNewItem({ ...newItem, dueDate: e.target.value })
              }
              className="border rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div
                className={`p-4 ${
                  item.priority === "high"
                    ? "bg-red-50"
                    : item.priority === "medium"
                    ? "bg-yellow-50"
                    : "bg-green-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {item.category}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditItem(item.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {isEditing === item.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={item.title}
                      onChange={e =>
                        setItems(
                          items.map(i =>
                            i.id === item.id
                              ? { ...i, title: e.target.value }
                              : i
                          )
                        )
                      }
                      className="border rounded-md px-3 py-2 w-full"
                    />
                    <textarea
                      value={item.description}
                      onChange={e =>
                        setItems(
                          items.map(i =>
                            i.id === item.id
                              ? { ...i, description: e.target.value }
                              : i
                          )
                        )
                      }
                      className="border rounded-md px-3 py-2 w-full"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setIsEditing(null)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="px-3 py-1 text-sm text-green-600 hover:text-green-800"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Due: {item.dueDate}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        +{item.points} points
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminChecklist;
