import React, { useState } from 'react';

interface SettingsTabProps {
  activeTab: string;
  checklist: Array<{ category: string }>;
  onSaveSettings?: (settings: any) => void;
}

const SettingsTab = ({ activeTab, checklist, onSaveSettings }: SettingsTabProps) => {
  const [settings, setSettings] = useState({
    defaultDueDays: 7,
    defaultPoints: 3,
    notifications: {
      emailOverdue: true,
      emailAssignment: true,
      dailyDigest: false
    },
    newCategory: ''
  });

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setSettings(prev => ({
      ...prev,
      ...(type === 'checkbox'
        ? { notifications: { ...prev.notifications, [name]: checked } }
        : { [name]: type === 'number' ? Number(value) : value })
    }));
  };

  const handleSaveSettings = () => {
    onSaveSettings?.(settings);
  };

  return (
    <>
      {activeTab === "settings" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium mb-6">System Settings</h3>

          <div className="space-y-6">
            {/* Checklist Configuration */}
            <div>
              <h4 className="text-base font-medium mb-3">
                Checklist Configuration
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Due Date (Days from Creation)
                  </label>
                  <input
                    type="number"
                    name="defaultDueDays"
                    value={settings.defaultDueDays}
                    onChange={handleSettingChange}
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Points per Task
                  </label>
                  <input
                    type="number"
                    name="defaultPoints"
                    value={settings.defaultPoints}
                    onChange={handleSettingChange}
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div>
              <h4 className="text-base font-medium mb-3">
                Notification Settings
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email-overdue"
                    name="emailOverdue"
                    checked={settings.notifications.emailOverdue}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-green-600 rounded"
                  />
                  <label
                    htmlFor="email-overdue"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Email notifications for overdue tasks
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email-assignment"
                    name="emailAssignment"
                    checked={settings.notifications.emailAssignment}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-green-600 rounded"
                  />
                  <label
                    htmlFor="email-assignment"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Email notifications when assigned a new task
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="daily-digest"
                    name="dailyDigest"
                    checked={settings.notifications.dailyDigest}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-green-600 rounded"
                  />
                  <label
                    htmlFor="daily-digest"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Daily digest of pending tasks
                  </label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-base font-medium mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {Array.from(
                  new Set(checklist.map(item => item.category))
                ).map(category => (
                  <span
                    key={category}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="flex max-w-md">
                <input
                  type="text"
                  name="newCategory"
                  value={settings.newCategory}
                  onChange={handleSettingChange}
                  placeholder="Add new category"
                  className="border border-gray-300 rounded-l-md p-2 flex-grow"
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
                  onClick={() => {
                    // Handle adding new category
                    if (settings.newCategory.trim()) {
                      // Add your category adding logic here
                      setSettings(prev => ({ ...prev, newCategory: '' }));
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleSaveSettings}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsTab;
