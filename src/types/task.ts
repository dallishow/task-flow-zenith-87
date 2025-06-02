
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate: Date | null;
}

export type FilterType = 'all' | 'pending' | 'completed';
