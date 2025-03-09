interface Notification {
  id: string | number;
  message: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onDismiss: (id: string | number) => void;
}

const NotificationPanel = ({ notifications, onDismiss }: NotificationPanelProps) => {
  return (
    <div className="notification-panel">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <span>{notification.message}</span>
            <button onClick={() => onDismiss(notification.id)}>Dismiss</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
