import { Task, mockTasks } from './adminMockApi';

// User-specific interfaces
export interface UserTask extends Task {
  completedAt?: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'user';
  assignedTasks: string[]; // Array of task IDs
}

// Mock user data
const mockUser: UserProfile = {
  id: 'user123',
  name: 'John Employee',
  role: 'user',
  assignedTasks: ['1', '2', '3', '4']
};

// Mock API service for users
export const userMockApiService = {
  // Get tasks assigned to the user
  getAssignedTasks: async (): Promise<UserTask[]> => {
    return new Promise((resolve) => {
      const userTasks = mockTasks
        .filter(task => mockUser.assignedTasks.includes(task.id))
        .map(task => ({
          ...task,
          completedAt: task.isCompleted ? new Date().toISOString() : undefined
        }));
      setTimeout(() => resolve(userTasks), 500);
    });
  },

  // Complete a task
  completeTask: async (taskId: string, notes?: string): Promise<UserTask> => {
    return new Promise((resolve, reject) => {
      const task = mockTasks.find(t => t.id === taskId);
      if (!task) {
        reject(new Error('Task not found'));
        return;
      }
      if (!mockUser.assignedTasks.includes(taskId)) {
        reject(new Error('Task not assigned to user'));
        return;
      }

      const updatedTask: UserTask = {
        ...task,
        isCompleted: true,
        completedAt: new Date().toISOString(),
        notes
      };

      setTimeout(() => resolve(updatedTask), 300);
    });
  },

  // Get user's completion history
  getTaskHistory: async (): Promise<UserTask[]> => {
    return new Promise((resolve) => {
      const completedTasks = mockTasks
        .filter(task =>
          mockUser.assignedTasks.includes(task.id) &&
          task.isCompleted
        )
        .map(task => ({
          ...task,
          completedAt: new Date().toISOString()
        }));
      setTimeout(() => resolve(completedTasks), 500);
    });
  },

};
