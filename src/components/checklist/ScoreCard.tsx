import { InfoIcon, Download } from "lucide-react";
import CircularProgress from "./CircularProgress";

interface ScoreCardProps {
  score: number;
  totalTasks: number;
  completedTasks: number;
}

const ScoreCard = ({ score, totalTasks, completedTasks }: ScoreCardProps) => {
  const completionPercentage =
    Math.round((completedTasks / totalTasks) * 100) || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <h5 className="text-lg sm:text-xl font-bold text-gray-900">
            Safety Score
          </h5>
          <div className="relative group ml-2">
            <InfoIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
            <div className="invisible group-hover:visible absolute z-10 w-64 sm:w-72 p-3 text-sm bg-white border border-gray-200 rounded-lg shadow-lg -right-2 mt-2">
              <h3 className="font-semibold text-gray-900">
                Safety Performance
              </h3>
              <p className="mt-2 text-gray-600">
                Score is calculated based on completed tasks and their priority
                levels. Higher scores indicate better food safety compliance.
              </p>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Download className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Circular Progress and Stats */}
      <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex justify-center">
          <CircularProgress
            percentage={completionPercentage}
            priority={
              completionPercentage < 33
                ? "high"
                : completionPercentage < 66
                ? "medium"
                : "low"
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex-1 sm:ml-6">
          <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {completedTasks}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Done</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-orange-600">
              {totalTasks - completedTasks}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg col-span-2">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {score}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Total Score</div>
          </div>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-200 pt-4 space-y-3 sm:space-y-0">
        <select className="text-sm text-gray-500 bg-transparent border-none focus:ring-0">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
        <a
          href="#"
          className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center justify-center sm:justify-start"
        >
          View Details
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ScoreCard;
