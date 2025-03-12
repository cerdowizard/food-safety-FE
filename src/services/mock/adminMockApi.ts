export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  dueTime?: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Reminder {
  id: string;
  taskId: string;
  message: string;
  time: string;
  isActive: boolean;
  createdBy: string;
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Sanitize countertops",
    isCompleted: false,
    assignedBy: "John Manager",
    priority: "high",
    createdAt: "2024-03-10T08:00:00Z"
  },
  {
    id: "2",
    title: "Check fridge temperature",
    isCompleted: false,
    assignedBy: "John Manager",
    priority: "high",
    createdAt: "2024-03-10T08:00:00Z"
  },
  {
    id: "3",
    title: "Empty trash bins",
    isCompleted: false,
    dueTime: "8:00 PM",
    assignedBy: "Sarah Supervisor",
    priority: "medium",
    createdAt: "2024-03-10T09:00:00Z"
  },
  {
    id: "4",
    title: "Inspect for pests",
    isCompleted: false,
    assignedBy: "Sarah Supervisor",
    priority: "medium",
    createdAt: "2024-03-10T09:30:00Z"
  }
];

export const mockReminders: Reminder[] = [
  {
    id: "1",
    taskId: "3",
    message: "Remember to empty trash bins",
    time: "8:00 PM",
    isActive: true,
    createdBy: "user123"
  }
];

// Mock API service
export const mockApiService = {
  // Tasks
  getTasks: async (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTasks), 500);
    });
  },

  updateTaskStatus: async (taskId: string, isCompleted: boolean): Promise<Task> => {
    return new Promise((resolve) => {
      const task = mockTasks.find(t => t.id === taskId);
      if (task) {
        task.isCompleted = isCompleted;
      }
      setTimeout(() => resolve(task!), 300);
    });
  },

  createTask: async (task: Omit<Task, 'id' | 'isCompleted' | 'createdAt'>): Promise<Task> => {
    return new Promise((resolve) => {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        isCompleted: false,
        createdAt: new Date().toISOString()
      };
      mockTasks.push(newTask);
      setTimeout(() => resolve(newTask), 300);
    });
  },

  deleteTask: async (taskId: string): Promise<void> => {
    return new Promise((resolve) => {
      const index = mockTasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        mockTasks.splice(index, 1);
      }
      setTimeout(resolve, 300);
    });
  },

  // Reminders
  getReminders: async (): Promise<Reminder[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockReminders), 500);
    });
  },

  createReminder: async (reminder: Omit<Reminder, 'id'>): Promise<Reminder> => {
    return new Promise((resolve) => {
      const newReminder = {
        ...reminder,
        id: Date.now().toString()
      };
      mockReminders.push(newReminder);
      setTimeout(() => resolve(newReminder), 300);
    });
  },

  deleteReminder: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      const index = mockReminders.findIndex(r => r.id === id);
      if (index !== -1) {
        mockReminders.splice(index, 1);
      }
      setTimeout(resolve, 300);
    });
  }
};
