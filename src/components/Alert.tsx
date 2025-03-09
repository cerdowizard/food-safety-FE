import React from "react";

interface AlertProps {
  type: "info" | "danger" | "success" | "warning" | "dark";
  message: string;
  onClose?: () => void; // Optional close handler
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  // Define styles based on the alert type
  const alertStyles = {
    info: "text-blue-800 bg-blue-50  dark:text-blue-400",
    danger: "text-red-800  dark:text-red-400",
    success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
    warning:
      "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
    dark: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300",
  };

  return (
    <div
      className={`p-4 mb-4 absolute top-0 text-sm rounded-lg ${alertStyles[type]}`}
      role="alert"
    >
      <span className="font-medium">
        {type.charAt(0).toUpperCase() + type.slice(1)} alert!
      </span>{" "}
      {message}
      {onClose && (
        <button
          className="float-right font-bold text-lg cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
