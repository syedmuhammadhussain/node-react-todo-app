import axios from 'axios';
import { Todo, CreateTodo } from '../types/todo';

const API_BASE = import.meta.env.VITE_API_BASE;

export const todoApi = {
  getAll: () => axios.get<Todo[]>(`${API_BASE}/todos`),
  create: (payload: Omit<CreateTodo, 'id'>) => axios.post<Todo>(`${API_BASE}/todos`, payload),
  update: (id: string, payload: Partial<Todo>) =>
    axios.put<Todo>(`${API_BASE}/todos/${id}`, payload),
  delete: (id: string) => axios.delete(`${API_BASE}/todos/${id}`),
  getById: (id: string) => axios.get(`${API_BASE}/todos/${id}`),
};
