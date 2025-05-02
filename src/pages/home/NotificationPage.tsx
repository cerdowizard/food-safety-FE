import { useState, useEffect } from 'react';
import { Bell, Trash2, Check, AlertCircle } from 'lucide-react';
import axiosInstance from '../../services/real/api';
import { toast } from 'react-toastify';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  created_at: string;
  is_read: boolean;
}

interface AxiosError{
  response?: {
    data: {
      message: string;
    };
  };
}

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/notifications',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          }
        });
        setNotifications(response.data.payload);
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err?.response?.data?.message || 'Failed to fetch notifications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await axiosInstance.patch(`/api/v1/notifications/${id}/mark-read`);
      setNotifications(prev =>
        prev.map(note =>
          note.id === id ? { ...note, is_read: true } : note
        )
      );
      toast.success('Notification marked as read');
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err?.response?.data?.message || 'Failed to update notification');
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/v1/notifications/${id}`);
      setNotifications(prev => prev.filter(note => note.id !== id));
      toast.success('Notification deleted');
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err?.response?.data?.message || 'Failed to delete notification');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-green-500" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Notifications
              </h1>
            </div>
            <span className="text-sm text-gray-500">
              {notifications.filter(n => !n.is_read).length} unread
            </span>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 mx-auto border-4 border-green-500 border-t-transparent rounded-full"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications to display
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm p-4 transition-all ${
                  !notification.is_read ? 'border-l-4 border-green-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <AlertCircle className={`h-5 w-5 ${
                        notification.type === 'warning' ? 'text-amber-500' :
                        notification.type === 'success' ? 'text-green-500' :
                        'text-blue-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.is_read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
