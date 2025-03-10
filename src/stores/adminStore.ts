import {create} from 'zustand';

// Types
export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  dueTime?: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high';
  reminder?: {
    message: string;
    time: string;
  };
}

interface AdminStore {
  // State
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTaskStatus: (taskId: string, isCompleted: boolean) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addReminder: (taskId: string, reminder: { message: string; time: string }) => Promise<void>;
}

// Mock data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Sanitize countertops",
    isCompleted: false,
    assignedBy: "John Manager",
    priority: "high",
    reminder: {
      message: "Don't forget to sanitize all food prep surfaces",
      time: "10:00 AM"
    }
  },
  {
    id: "2",
    title: "Check fridge temperature",
    isCompleted: false,
    assignedBy: "John Manager",
    priority: "high",
    reminder: {
      message: "Record temperature in all fridges",
      time: "11:00 AM"
    }
  },
  {
    id: "3",
    title: "Empty trash bins",
    isCompleted: false,
    dueTime: "8:00 PM",
    assignedBy: "Sarah Supervisor",
    priority: "medium",
    reminder: {
      message: "Remember to empty all trash bins",
      time: "8:00 PM"
    }
  },
  {
    id: "4",
    title: "Inspect for pests",
    isCompleted: false,
    assignedBy: "Sarah Supervisor",
    priority: "medium"
  }
];

// Create store
const useAdminStore = create<AdminStore>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  // Fetch all tasks
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ tasks: mockTasks });
    } catch (error) {
      set({ error: 'Failed to fetch tasks' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add new task
  addTask: async (task: Omit<Task, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const newTask = {
        ...task,
        id: Date.now().toString()
      };
      set(state => ({
        tasks: [...state.tasks, newTask]
      }));
    } catch (error) {
      set({ error: 'Failed to add task' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Update task status
  updateTaskStatus: async (taskId: string, isCompleted: boolean) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, isCompleted } : task
        )
      }));
    } catch (error) {
      set({ error: 'Failed to update task' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete task
  deleteTask: async (taskId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
      }));
    } catch (error) {
      set({ error: 'Failed to delete task' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add reminder to task
  addReminder: async (taskId: string, reminder: { message: string; time: string }) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === taskId ? { ...task, reminder } : task
        )
      }));
    } catch (error) {
      set({ error: 'Failed to add reminder' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAdminStore;
