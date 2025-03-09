interface ProgressTrackerProps {
  completedTasks: number;
  totalTasks: number;
}

const ProgressTracker = ({ completedTasks, totalTasks }: ProgressTrackerProps) => {
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="progress-tracker">
      <h2>Progress</h2>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>
        {completedTasks} of {totalTasks} tasks completed
      </p>
    </div>
  );
};

export default ProgressTracker;
