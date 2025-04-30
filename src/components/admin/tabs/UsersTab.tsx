import { Plus, Edit, Trash } from "lucide-react";

export interface UserPayload {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  completedTasks: number;
  pendingTasks: number;
}



interface UsersTabProps {
  activeTab: string;
  users: UserPayload[];
  setIsAddUserModalOpen: (isOpen: boolean) => void;
}

const UsersTab = ({ activeTab, users, setIsAddUserModalOpen }: UsersTabProps) => {
  return (
    <>
      {activeTab === "users" && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">User Management</h3>
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="flex items-center space-x-1 bg-green-500 text-white py-2 px-4 rounded-lg"
              >
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
                    <h4 className="font-medium text-gray-900">{user.first_name + " " + user.last_name}</h4>
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
    </>
  );
};

export default UsersTab;
