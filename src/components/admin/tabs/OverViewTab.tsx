import ScoreCard from "../../checklist/ScoreCard";
import { AlertCircle, PieChart, Users, CheckCircle } from "lucide-react";
import { UserPayload } from "./UsersTab";


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

interface OverViewTabProps {
  activeTab: string;
  completedTasks: ChecklistItem[];
  checklist :  ChecklistItem[];
  pendingTasks: ChecklistItem[];
  completionRate: number;
  users: UserPayload[]

}


const OverViewTab = ({activeTab, completedTasks, pendingTasks, completionRate, checklist, users}: OverViewTabProps): JSX.Element => {



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



  return (
    <div>
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm">Pending Tasks</h3>
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-3xl font-bold mb-4">{pendingTasks.length}</p>
                  {pendingTasks.length > 0 ? (
                    <div className="space-y-3 max-h-[200px] overflow-y-auto">
                      {pendingTasks.slice(0, 5).map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start p-2 rounded-lg bg-orange-50"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {task.title}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className={`
                                px-2 py-1 text-xs rounded-full
                                ${task.priority === 'high'
                                  ? 'bg-red-100 text-red-700'
                                  : task.priority === 'medium'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-green-100 text-green-700'
                                }
                              `}>
                                {task.priority}
                              </span>
                              <span className="ml-2 text-xs text-gray-500">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {pendingTasks.length > 5 && (
                        <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                          View all {pendingTasks.length} tasks
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No pending tasks</p>
                  )}
                </div>
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

    </div>
  )
}

export default OverViewTab
