import { useState, useContext } from "react";
import UserDataContext from "../contexts/UserDataContext";
import { UserI } from "../types/auth/user.type";
import { Bell, Lock, User } from "lucide-react";

const SettingsPage = () => {
  const user = useContext<UserI | null>(UserDataContext);

  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });

  // State for Change Password
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleNotificationChange = (type: string) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof notificationPreferences],
    }));
  };

  // Handle Change Password
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePasswordData(prev => ({ ...prev, [name]: value }));
  };

  const submitChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      changePasswordData.newPassword !== changePasswordData.confirmNewPassword
    ) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (changePasswordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    // Handle password change logic (e.g., API call)
    console.log("Changing password...", changePasswordData);
    setPasswordError("");
    alert("Password changed successfully!");

    // Reset form
    setChangePasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information (Read-Only) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl shadow-lg bg-white">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-green-500" />
                  <h2 className="ml-2 text-lg font-semibold text-gray-900">
                    Profile Information
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="sm:flex-row   flex flex-col sm:items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={user?.first_name || ""}
                      readOnly
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 border-gray-300 cursor-not-allowed"
                    />
                  </div>
                  <div className="sm:flex-row   flex flex-col sm:items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={user?.last_name || ""}
                      readOnly
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 border-gray-300 cursor-not-allowed"
                    />
                  </div>
                  <div className="sm:flex-row   flex flex-col sm:items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 border-gray-300 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="rounded-xl shadow-lg bg-white">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-green-500" />
                  <h2 className="ml-2 text-lg font-semibold text-gray-900">
                    Notification Preferences
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Email Notifications
                    </span>
                    <button
                      onClick={() => handleNotificationChange("email")}
                      className={`w-10 h-6 rounded-full p-1 transition-colors ${
                        notificationPreferences.email
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          notificationPreferences.email
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      SMS Notifications
                    </span>
                    <button
                      onClick={() => handleNotificationChange("sms")}
                      className={`w-10 h-6 rounded-full p-1 transition-colors ${
                        notificationPreferences.sms
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          notificationPreferences.sms
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Push Notifications
                    </span>
                    <button
                      onClick={() => handleNotificationChange("push")}
                      className={`w-10 h-6 rounded-full p-1 transition-colors ${
                        notificationPreferences.push
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          notificationPreferences.push
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="lg:col-span-1 space-y-8">
            {/* Change Password Section */}
            <div className="rounded-xl shadow-lg bg-white">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-green-500" />
                  <h2 className="ml-2 text-lg font-semibold text-gray-900">
                    Change Password
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={submitChangePassword} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={changePasswordData.currentPassword}
                      onChange={handleChangePassword}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={changePasswordData.newPassword}
                      onChange={handleChangePassword}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={changePasswordData.confirmNewPassword}
                      onChange={handleChangePassword}
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 border-gray-300"
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-sm text-red-600">{passwordError}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
