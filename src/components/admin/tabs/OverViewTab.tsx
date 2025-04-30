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

    </div>
  )
}

export default OverViewTab
