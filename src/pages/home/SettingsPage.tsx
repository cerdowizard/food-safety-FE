import { useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { Lock, User } from "lucide-react";

const SettingsPage = () => {
  const { user } = useUserData();

  // State for Change Password
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

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
    <div className="min-h-screen py-8 bg-white">
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
                      value={user?.user_email || ""}
                      readOnly
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 border-gray-300 cursor-not-allowed"
                    />
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
