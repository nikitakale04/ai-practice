import axios from 'axios';
import type { Task } from '../types/Task';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  updateTask: async (id: number, task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  toggleTaskCompletion: async (id: number): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}/complete`);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  getTasksByStatus: async (isPaid: boolean): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/tasks/status/${isPaid}`);
    return response.data;
  },

  getTasksByCategory: async (category: string): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/tasks/category/${category}`);
    return response.data;
  },

  getOverdueTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks/overdue');
    return response.data;
  },
};
