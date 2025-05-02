import { useState, useEffect, useContext } from "react";
import UserDataContext from "../../contexts/UserDataContext";
import { ChecklistItem } from "./Checklist";
import axiosInstance from "../../services/real/api";
// import LoadingSpinner from "../../components/LoadingSpinner";

import {
  mockApiService,
  // Reminder
} from "../../services/mock/adminMockApi";
import adminStore, { Task } from "../../stores/adminStore";

import {
  ClipboardCheck,
  ThermometerSun,
  Settings,
  Bell,
  ListCheck,
  Check,
  AlertCircle,
  // X,
} from "lucide-react";
import QuickActionButton from "../../components/QuickActionButton";
import { useNavigate } from "react-router-dom";
import ScoreCard from "../../components/checklist/ScoreCard";

// Add this interface near the top of your file
interface FreezerType {
  name: string;
  target: string;
}

const DashboardPage = () => {
    const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
    // const [isLoading, setIsLoading] = useState(true); // Add this line
  const navigate = useNavigate();
  const { fetchTasks } = adminStore();
  // const { user } = useUserData(); // Replace the useContext line with this
  const userData = useContext(UserDataContext);
  const auth = userData
  console.log(auth);
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [reminders, setReminders] = useState<Reminder[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // Add this to your component, after the existing state declarations
  const [selectedFreezer, setSelectedFreezer] = useState<FreezerType>({
    name: "Main Fridge",
    target: "1-4°C",
  });

  // Add this constant inside your component
  const freezers: FreezerType[] = [
    { name: "Main Fridge", target: "1-4°C" },
    { name: "Freezer 1", target: "-18°C" },
    { name: "Deep Freeze", target: "-22°C" },
  ];

  // Fetch tasks and reminders
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const [tasksData, remindersData] = await Promise.all([
        //   mockApiService.getTasks(),
        //   mockApiService.getReminders(),
        // ]);
        const response: Task[] = await fetchTasks();
        setTasks(response);
        // setReminders(remindersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchTasks]);

  // secure route
  useEffect(()=>{
    const token = localStorage.getItem("access-token");
    if(!token){
      navigate('/auth/login')
    }

  },[navigate])

  const handleTaskCompletion = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        await mockApiService.updateTaskStatus(taskId, !task.isCompleted);
        setTasks(
          tasks.map(t =>
            t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const quickActions = [
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        /* Handle pest reporting */
        navigate("/settings");
      },
    },
    {
      icon: ListCheck,
      label: "Checklist",
      onClick: () => {
        /* Handle reminders */
        navigate("/checklist");
      },
    },
    {
      icon: Bell,
      label: "Notifications",
      onClick: () => {
        /* Handle reminders */
        navigate("/notifications");
      },
    },
  ];

  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const getCheckList = async() => {
      try {
        // setIsLoading(true); // Set loading to true before fetching
        const response = await axiosInstance.get('/api/v1/get_assign_checklist?status=all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          }
        });

        console.log(response.data.payload);

        // Map backend data to frontend structure
        const mappedChecklist = response.data.payload.map((item: any) => ({
          id: item.id,
          title: item.task_name,
          description: item.task_description,
          category: item.category,
          isCompleted: item.is_completed,
          priority: item.task_type,
          dueDate: item.due_date,
          points: item.task_points,
        }));

        setChecklist(mappedChecklist);
      } catch (error) {
        console.error("Error fetching checklist:", error)
      } finally {
        // setIsLoading(false); // Set loading to false after fetching
      }
    };

    getCheckList();
  }, [auth?.user?.access_token]);


  // Add these calculations for the ScoreCard
  const completedTasks = checklist.filter(item => item.isCompleted);
  const score = completedTasks.length;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* User Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, {auth.user?.first_name || "Lowkey"}
          </h1>
          <p className="mt-2 text-gray-600">
            Your daily food safety tasks and activities
          </p>
        </div>

        {/* Overview and Quick Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Overview Section - Takes up 2/3 of the space */}
          <div className="lg:col-span-2">
          <ScoreCard
                score={score}
                totalTasks={checklist.length}
                completedTasks={completedTasks.length}
              />
          </div>

          {/* Quick Actions Section - Takes up 1/3 of the space */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <QuickActionButton
                    key={index}
                    icon={action.icon}
                    label={action.label}
                    onClick={action.onClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your existing grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Tasks Section - Larger */}
          <div className="lg:col-span-4 space-y-8">
            {/* Daily Tasks Card */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ClipboardCheck className="h-5 w-5 text-green-500" />
                    <h2 className="ml-2 text-lg font-semibold text-gray-900">
                      Today's Tasks
                    </h2>
                  </div>
                  <span className="text-sm text-gray-500">
                    {tasks.filter(t => t.isCompleted).length}/{tasks.length}{" "}
                    completed
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleTaskCompletion(task.id)}
                        className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500 focus:ring-offset-0"
                      />
                      <div className="ml-4 flex-1">
                        <p
                          className={`text-sm font-medium ${
                            task.isCompleted
                              ? "text-gray-400 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </p>
                        {task.dueTime && (
                          <p className="text-xs text-gray-500 mt-1">
                            Due by {task.dueTime}
                          </p>
                        )}
                      </div>
                      {task.isCompleted && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Temperature Log Form - Updated Design */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThermometerSun className="h-5 w-5 text-green-500" />
                    <h2 className="ml-2 text-lg font-semibold text-gray-900">
                      Temperature Log
                    </h2>
                  </div>
                  <span className="text-sm text-gray-500">
                    Last checked: 2 hours ago
                  </span>
                </div>
              </div>
              <div className="p-6">
                <form className="space-y-6">
                  {/* Temperature Presets */}
                  <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
                    {freezers.map(freezer => (
                      <button
                        key={freezer.name}
                        type="button"
                        onClick={() => setSelectedFreezer(freezer)}
                        className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${
                          selectedFreezer.name === freezer.name
                            ? "border-green-500 bg-green-50"
                            : "border-gray-100 hover:border-green-500 hover:bg-green-50"
                        }`}
                      >
                        <ThermometerSun className="h-6 w-6 text-green-500 mb-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {freezer.name}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Target: {freezer.target}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Temperature Input */}
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {selectedFreezer.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Safe range: {selectedFreezer.target}
                        </p>
                      </div>
                      <div className="relative w-32">
                        <input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          className="block w-full px-4 py-2.5 text-lg text-center font-medium
                            rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                          °C
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span className="text-amber-700">
                        Temperature should be between 1-4°C
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-br  bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600
                        font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Log Temperature</span>
                      <ThermometerSun className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg
                        font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-amber-500" />
                  <h2 className="ml-2 text-lg font-semibold text-gray-900">
                    Reminders
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {/*  {reminders.map(reminder => (
                    <div
                      key={reminder.id}
                      className="flex p-3 bg-amber-50 rounded-lg"
                    >
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-amber-800">
                          {reminder.message}
                        </p>
                        <p className="text-xs text-amber-600 mt-1">
                          Due by {reminder.time}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          mockApiService.deleteReminder(reminder.id)
                        }
                        className="text-amber-700 hover:text-amber-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
