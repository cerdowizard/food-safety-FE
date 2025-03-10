import { useMemo } from "react";

interface CircularProgressProps {
  percentage: number;
  priority: "high" | "medium" | "low";
}

const CircularProgress = ({ percentage, priority }: CircularProgressProps) => {
  // Fixed sizes for mobile and desktop

  const colorScheme = useMemo(() => {
    switch (priority) {
      case "high":
        return {
          ring: "stroke-red-500",
          text: "text-red-700",
          bg: "bg-red-50",
        };
      case "medium":
        return {
          ring: "stroke-orange-500",
          text: "text-orange-700",
          bg: "bg-orange-50",
        };
      case "low":
        return {
          ring: "stroke-green-500",
          text: "text-green-700",
          bg: "bg-green-50",
        };
    }
  }, [priority]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px]"
        viewBox="0 0 160 160"
      >
        {/* Background circle */}
        <circle
          className="stroke-gray-200"
          strokeWidth={12}
          fill="none"
          r={70}
          cx={80}
          cy={80}
        />
        {/* Progress circle */}
        <circle
          className={`${colorScheme.ring} transition-all duration-300 ease-in-out`}
          strokeWidth={12}
          strokeLinecap="round"
          fill="none"
          r={70}
          cx={80}
          cy={80}
          style={{
            strokeDasharray: 439.6, // 2 * π * 70
            strokeDashoffset: 439.6 * (1 - percentage / 100),
          }}
        />
      </svg>
      <div
        className={`absolute flex flex-col items-center justify-center ${colorScheme.bg} rounded-full p-4 md:p-6`}
      >
        <span className={`text-xl sm:text-3xl font-bold ${colorScheme.text}`}>
          {percentage}%
        </span>
        <span className="text-xs sm:text-sm text-gray-600">Completed</span>
      </div>
    </div>
  );
};

export default CircularProgress;
