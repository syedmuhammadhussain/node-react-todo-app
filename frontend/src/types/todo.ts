export interface Todo {
  id: string;
  title: string;
  description?: string;
  status?: string;
}

export interface CreateTodo {
  title: string;
}

export type TodoFilter = 'pending' | 'completed';
