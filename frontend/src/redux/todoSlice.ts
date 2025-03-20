import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { todoApi } from '../api/todos';
import type { CreateTodo, Todo } from '../types/todo';

interface TodosState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[], void>(
  'todos/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoApi.getAll();
      // Assuming API returns { success: true, data: Todo[] }
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const addNewTodo = createAsyncThunk<Todo, CreateTodo>(
  'todos/add',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await todoApi.create(payload);
      // Assuming API returns { success: true, data: Todo }
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateTodo = createAsyncThunk<Todo, { id: string; changes: Partial<Todo> }>(
  'todos/update',
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      const response = await todoApi.update(id, changes);
      // Assuming API returns { success: true, data: updatedTodo }
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteTodo = createAsyncThunk<string, string>(
  'todos/delete',
  async (id, { rejectWithValue }) => {
    try {
      await todoApi.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.items.findIndex((t) => t.id === updatedTodo.id);
        if (index >= 0) {
          state.items[index] = updatedTodo;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
