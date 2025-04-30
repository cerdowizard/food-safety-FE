import React, { useState, useEffect, useContext } from "react";
import {
  Users,
  Settings,
  Clipboard,
  PieChart,
  X,
  User,
  Mail,
  Phone,
  Lock,
  Home,
  MapPin,
  Globe,
  Building,
  FileText,
  ListTodo,
  Tag,
  AlertTriangle,
  Calendar,
  Award,
  UserCheck
} from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../../services/real/api";
import OverViewTab from "../../components/admin/tabs/OverViewTab";
import AdminChecklistsTab from "../../components/admin/tabs/AdminChecklistsTab";
import UsersTab from "../../components/admin/tabs/UsersTab";
import SettingsTab from "../../components/admin/tabs/SettingsTab";
import UserDataContext, { UserDataContextType } from "../../contexts/UserDataContext";
import { AxiosError } from "axios";
import { UserPayload} from "../../components/admin/tabs/UsersTab";


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

interface ChecklistPayload {
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
  points: number;
  assignedTo: string;
}



interface OrgUserI {
    id: string;
    org_id: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface ErrorResponse {
  message: string;
}

interface RegisterUserPayloadI {
  org_id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  confirmPassword?: string;
}


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "checklists" | "users" | "settings"
  >("overview");
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);

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

  const [checklistPayload, setChecklistPayload] = useState<ChecklistPayload>({
    title: "",
    description: "",
    category: "Temperature Control",
    isCompleted: false,
    priority: "low",
    dueDate: "",
    points: 3,
    assignedTo: "",
  })

  const handleChecklistChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setChecklistPayload(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const addChecklist = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const payload = {
        task_name: checklistPayload.title,
        task_description: checklistPayload.description,
        task_type: checklistPayload.priority,
        user_id: checklistPayload.assignedTo,
        task_points: checklistPayload.points,
        category: checklistPayload.category,
        due_date: checklistPayload.dueDate
      };

      console.log("Sending payload:", payload);
      console.log("org id", auth.user?.org_id);

      const response = await axiosInstance.post(
        `/api/v1/check_list?org_id=${auth.user?.org_id?.trim()}`,
        payload
      );

      if (response.data.is_success) {
        // Reset form
        setChecklistPayload({
          title: "",
          description: "",
          category: "Temperature Control",
          isCompleted: false,
          priority: "low",
          dueDate: "",
          points: 3,
          assignedTo: "",
        });

        // Close modal
        setEditMode(false);

        toast.success("Checklist item added successfully");

        // Optionally refresh the checklist data
        // You might want to fetch the updated list from the server here
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.error("Error payload:", err.response?.data);
      toast.error(err?.response?.data?.message || "Failed to create checklist item");
    }
  }

  const [users, setUsers] = useState<UserPayload[]>([]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [userPayload, setUserPayload] = useState<RegisterUserPayloadI>({
    org_id: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    confirmPassword: "",
  });

  // Calculate statistics
  const completedTasks = checklist.filter(item => item.isCompleted);
  const pendingTasks = checklist.filter(item => !item.isCompleted);
  const completionRate = Math.round(
    (completedTasks.length / checklist.length) * 100
  );
  const [orgUsers, setOrgUsers] = useState<OrgUserI[]>([]);
  const auth = useContext<UserDataContextType>(UserDataContext)
  // console.log("auth", auth)



  useEffect(() => {
    const getOrgUsers = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/organization/${auth.user?.org_id}`);
        console.log("org id", auth.user?.org_id);
        setOrgUsers(response.data?.payload);
        setUsers(response.data?.payload)
        console.log("org users", response.data?.payload);
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;
        toast.error(err?.response?.data?.message || "Failed to fetch users");
      }
    };

    // Call the function immediately
    if (auth.user?.org_id) {
      getOrgUsers();
    }
  }, [auth.user?.org_id]);


  useEffect(() => {
    const getAllChecklists = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/checklists?org_id=${auth.user?.org_id}`, {
          headers: {
            "Authorization": `Bearer ${auth.user?.access_token}`
          }
        });

        // Map the backend data structure to frontend structure
        const mappedChecklists = response.data.payload.map((item: any) => ({
          id: item.id,
          title: item.task_name,
          description: item.task_description,
          priority: item.task_type,
          assignedTo: item.assigned_to_name,
          points: item.task_points,
          category: item.category,
          dueDate: item.due_date,
          isCompleted: item.is_completed,
          completedBy: item.completed_by,
          completedAt: item.created_at
        }));

        setChecklist(mappedChecklists);
        console.log("checklist", checklist);

      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;
        toast.error(err?.response?.data?.message || "Failed to fetch checklists");
      }
    };

    getAllChecklists();
  }, [auth.user?.org_id, auth.user?.access_token]);


  const deleteItem = (id: string) => {
    setChecklist(items => items.filter(item => item.id !== id));
    //Todo , i need to delete this setUser , am just using it here like this to escape build error

  };

  const openEditModal = (item: ChecklistItem | null) => {
    setSelectedItem(item);
    setEditMode(true);
  };

  const closeEditModal = () => {
    setSelectedItem(null);
    setEditMode(false);
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserPayload(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const registerUser = async(e: React.FormEvent)=>{
    try {
      e.preventDefault();

      if (userPayload.password !== userPayload.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Create request payload without confirmPassword
      const { confirmPassword, ...requestPayload } = {
        ...userPayload,
        org_id: auth.user?.org_id || ""
      };

      const response = await axiosInstance.post('/api/v1/signup', requestPayload);
        toast.success(response.data.message || "User created successfully");
        setIsAddUserModalOpen(false);
        // Reset form
        setUserPayload({
          org_id: "",
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip_code: "",
          country: "",
          confirmPassword: "",
        });
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err?.response?.data?.message || "Failed to create user");
    }
  }



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



          {/* Overview Tab */}
        <OverViewTab activeTab={activeTab} completedTasks={completedTasks} pendingTasks={pendingTasks} completionRate={completionRate} checklist={checklist} users={users} />

        {/* Checklists Tab Content */}
        <AdminChecklistsTab activeTab={activeTab} checklist={checklist} setChecklist={setChecklist} openEditModal={openEditModal} deleteItem={deleteItem}/>

        {/* Users Tab Content */}
          <UsersTab
          activeTab={activeTab}
          users={users}
          setIsAddUserModalOpen={setIsAddUserModalOpen}
          />

        {/* Settings Tab Content */}
    <SettingsTab
      activeTab={activeTab}
      checklist={checklist}
      onSaveSettings={(settings) => {
       console.log('Saving settings:', settings);
        toast.success('Settings saved successfully');
      }}
/>

        {/* add checklist  */}
        {editMode && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <h3 className="text-lg font-medium mb-4">
                {selectedItem ? "Edit Task" : "Add New Task"}
              </h3>
              <form onSubmit={addChecklist} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <div className="relative">
                      <input
                        name="title"
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                        value={checklistPayload.title}
                        onChange={handleChecklistChange}
                        required
                      />
                      <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                        value={checklistPayload.description}
                        onChange={(e) => setChecklistPayload(prev => ({
                          ...prev,
                          description: e.target.value
                        }))}
                        required
                      />
                      <ListTodo className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          name="category"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                          value={checklistPayload.category}
                          onChange={(e) => setChecklistPayload(prev => ({
                            ...prev,
                            category: e.target.value
                          }))}
                          required
                        >
                          <option>Temperature Control</option>
                          <option>Sanitation</option>
                          <option>Pest Control</option>
                          <option>Hygiene</option>
                          <option>Food Storage</option>
                          <option>Waste Management</option>
                        </select>
                        <Tag className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <div className="relative">
                        <select
                          name="priority"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                          value={checklistPayload.priority}
                          onChange={(e) => setChecklistPayload(prev => ({
                            ...prev,
                            priority: e.target.value as "high" | "medium" | "low"
                          }))}
                          required
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                        <AlertTriangle className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <div className="relative">
                        <input
                          name="dueDate"
                          type="date"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                          value={checklistPayload.dueDate}
                          onChange={handleChecklistChange}
                          required
                        />
                        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Points
                      </label>
                      <div className="relative">
                        <input
                          name="points"
                          type="number"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                          value={checklistPayload.points}
                          onChange={(e) => setChecklistPayload(prev => ({
                            ...prev,
                            points: parseInt(e.target.value)
                          }))}
                          required
                        />
                        <Award className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assigned To
                      </label>
                      <div className="relative">
                        <select
                          name="assignedTo"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                          value={checklistPayload.assignedTo}
                          onChange={handleChecklistChange}
                          required
                        >
                          <option value="">Select User</option>

                          {orgUsers.map(user => (
                            <option  key={user.id} value={user.id}>
                              {user.first_name} {user.last_name}
                            </option>
                          ))}
                        </select>
                        <UserCheck className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
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

        {/* Add User Modal */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Add New User</h3>
                <button
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={registerUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        name="first_name"
                        type="text"
                        required
                        value={userPayload.first_name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        name="last_name"
                        type="text"
                        required
                        value={userPayload.last_name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        name="email"
                        type="email"
                        required
                        value={userPayload.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={userPayload.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type="password"
                        required
                        value={userPayload.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type="password"
                        required
                        value={userPayload.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <input
                        name="address"
                        type="text"
                        required
                        value={userPayload.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <Home className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <div className="relative">
                      <input
                        name="city"
                        type="text"
                        required
                        value={userPayload.city}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <div className="relative">
                      <input
                        name="state"
                        type="text"
                        required
                        value={userPayload.state}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <div className="relative">
                      <input
                        name="zip_code"
                        type="text"
                        required
                        value={userPayload.zip_code}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <input
                        name="country"
                        type="text"
                        required
                        value={userPayload.country}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Add User
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

export default AdminDashboard;
