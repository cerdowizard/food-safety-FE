import { create } from "zustand";
import { mockApiService } from "../services/mock/adminMockApi";

// Types
export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  dueTime?: string;
  assignedBy: string;
  priority: "low" | "medium" | "high";
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
  fetchTasks: () => Promise<Task[]>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTaskStatus: (taskId: string, isCompleted: boolean) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addReminder: (
    taskId: string,
    reminder: { message: string; time: string }
  ) => Promise<void>;
}

// Create store
const useAdminStore = create<AdminStore>(set => ({
  // Tasks state--------------------------
  tasks: [],
  isLoading: false,
  error: null,

  // Fetch all tasks
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApiService.getTasks();
      return response;
      set({ tasks: response });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ error: "Failed to fetch tasks" });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // Add new task
  addTask: async (task: Omit<Task, "id">) => {
    set({ isLoading: true, error: null });
    try {
      //TODO:  Simulate API call
      const response = await mockApiService.createTask(task);
      const newTask = {
        ...response,
        id: Date.now().toString(),
      };
      set(state => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (error) {
      set({ error: "Failed to add task" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Update task status
  updateTaskStatus: async (taskId: string, isCompleted: boolean) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Simulate API call
      const response = await mockApiService.updateTaskStatus(
        taskId,
        isCompleted
      );

      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === response.id
            ? { ...task, isCompleted: response.isCompleted }
            : task
        ),
      }));
    } catch (error) {
      set({ error: "Failed to update task" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete task
  deleteTask: async (taskId: string) => {
    set({ isLoading: true, error: null });
    try {
      //TODO:  Simulate API call
      await mockApiService.deleteTask(taskId);
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId),
      }));
    } catch (error) {
      set({ error: "Failed to delete task" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add reminder to task
  addReminder: async (
    taskId: string,
    reminder: { message: string; time: string }
  ) => {
    set({ isLoading: true, error: null });
    try {
      //TODO:  Simulate API call
      const response = await mockApiService.createReminder({
        ...reminder,
        taskId,
        isActive: true,
        createdBy: "system",
      });

      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === response.taskId ? { ...task, reminder: response } : task
        ),
      }));
    } catch (error) {
      set({ error: "Failed to add reminder" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAdminStore;
