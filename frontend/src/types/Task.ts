export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  paid: boolean;
  recurring: boolean;
  category: string;
  amount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  category: string;
  amount?: number;
  recurring: boolean;
}
