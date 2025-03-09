interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface DailyChecklistProps {
  tasks: Task[];
  onTaskComplete: (id: string) => void;
}

const DailyChecklist = ({ tasks, onTaskComplete }: DailyChecklistProps) => {
  return (
    <div className="checklist">
      <h2>Daily Checklist</h2>
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onTaskComplete(task.id)}
          />
          <span>{task.title}</span>
        </div>
      ))}
    </div>
  );
};

export default DailyChecklist;
