import { useState, useContext } from "react";
import UserDataContext from "../contexts/UserDataContext";
import { UserI } from "../types/auth/user.type";
import { User, Mail } from "lucide-react";

const ProfilePage = () => {
  const user = useContext<UserI | null>(UserDataContext);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfileChanges = () => {
    // Handle saving profile changes (e.g., API call)
    console.log("Saving profile changes...", profileData);
    setIsEditingProfile(false);
  };

  // Generate avatar initials
  const getAvatarInitials = () => {
    const firstInitial = profileData.firstName.charAt(0).toUpperCase();
    const lastInitial = profileData.lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your profile information and settings
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl shadow-lg bg-white">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-green-500" />
                    <h2 className="ml-2 text-lg font-semibold text-gray-900">
                      Profile Information
                    </h2>
                  </div>
                  {isEditingProfile ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={saveProfileChanges}
                        className="text-sm text-green-600 hover:text-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="text-sm text-gray-600 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="text-sm text-green-600 hover:text-green-700"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Avatar with Initials */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-500 text-white text-3xl font-semibold">
                      {getAvatarInitials()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {profileData.email}
                      </p>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-4">
                    <div className="sm:flex-row  flex flex-col sm:items-center">
                      <label className="w-32 text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                        className="flex-1 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 border-gray-300"
                      />
                    </div>
                    <div className="sm:flex-row  flex flex-col sm:items-center">
                      <label className="w-32 text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                        className="flex-1 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 border-gray-300"
                      />
                    </div>
                    <div className="sm:flex-row  flex flex-col sm:items-center">
                      <label className="w-32 text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                        className="flex-1 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information (Placeholder) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="rounded-xl shadow-lg bg-white">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-green-500" />
                  <h2 className="ml-2 text-lg font-semibold text-gray-900">
                    Contact Information
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      disabled
                      value="+1 (555) 123-4567"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      disabled
                      value="123 Main St, City, Country"
                      className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-900 border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
