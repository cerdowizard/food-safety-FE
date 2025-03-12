import { create } from "zustand";
import { Task } from "./adminStore";
import { userMockApiService } from "../services/mock/userMockApi";

// Types
export interface UserTask extends Task {
  completedAt?: string;
  notes?: string;
}

interface UserStore {
  // State
  assignedTasks: UserTask[];
  completedTasks: UserTask[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchAssignedTasks: () => Promise<void>;
  fetchCompletedTasks: () => Promise<void>;
  completeTask: (taskId: string, notes?: string) => Promise<void>;
}

const useUserStore = create<UserStore>(set => ({
  // Initial state
  assignedTasks: [],
  completedTasks: [],
  isLoading: false,
  error: null,

  // Fetch assigned tasks
  fetchAssignedTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      //TODO stimulate real api call
      const tasks = await userMockApiService.getAssignedTasks();
      set({
        assignedTasks: tasks.filter(task => !task.isCompleted),
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching assigned tasks:", error);
      set({
        error: "Failed to fetch assigned tasks",
        isLoading: false,
      });
    }
  },

  // Fetch completed tasks history
  fetchCompletedTasks: async () => {
    set({ isLoading: true, error: null });
    try {
        //TODO stimulate real api call
      const history = await userMockApiService.getTaskHistory();
      set({
        completedTasks: history,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching task history:", error);
      set({
        error: "Failed to fetch task history",
        isLoading: false,
      });
    }
  },

  // Complete a task
  completeTask: async (taskId: string, notes?: string) => {
    set({ isLoading: true, error: null });
    try {
      //TODO stimulate real api call
      const completedTask = await userMockApiService.completeTask(
        taskId,
        notes
      );

      set(state => ({
        assignedTasks: state.assignedTasks.filter(task => task.id !== taskId),
        completedTasks: [...state.completedTasks, completedTask],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error completing task:", error);
      set({
        error: "Failed to complete task",
        isLoading: false,
      });
    }
  },
}));

export default useUserStore;
