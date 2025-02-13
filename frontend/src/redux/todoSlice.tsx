import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type Todo from '../types/Todo';

type TodoSliceState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodoSliceState = {
  todos: [],
  loading: false,
  error: null,
};

const getTodosAsync = createAsyncThunk<Todo[], void>(
  'todos/getTodosAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:9090/todos');
      const todos: Todo[] = await response.json();
      return todos;
    } catch {
      return rejectWithValue('Failed to fetch todos');
    }
  }
);

export const addTodoAsync = createAsyncThunk<void, Todo>(
  'todos/addTodoAsync',
  async (todo, thunkAPI) => {
    try {
      await fetch('http://localhost:9090/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify(todo),
      });

      thunkAPI.dispatch(getTodosAsync());
    } catch {
      return thunkAPI.rejectWithValue('Error creating new todo');
    }
  }
);

export const updateTodoAsync = createAsyncThunk<void, Todo>(
  'todos/updateTodoAsync',
  async (todo, thunkAPI) => {
    try {
      await fetch('http://localhost:9090/todos/' + todo.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify(todo),
      });

      thunkAPI.dispatch(getTodosAsync());
    } catch {
      return thunkAPI.rejectWithValue('Error updating todo');
    }
  }
);

export const deleteTodoAsync = createAsyncThunk<void, Todo>(
  'todos/deleteTodoAsync',
  async (todo, thunkAPI) => {
    try {
      await fetch('http://localhost:9090/todos/' + todo.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'applications/json' },
      });

      thunkAPI.dispatch(getTodosAsync());
    } catch {
      return thunkAPI.rejectWithValue('Error deleting todo');
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getTodosAsync.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.loading = false;
          state.todos = action.payload;
        }
      )
      .addCase(addTodoAsync.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateTodoAsync.fulfilled, state => {
        state.loading = false;
      })
      .addCase(deleteTodoAsync.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getTodosAsync.pending, state => {
        state.loading = true;
      })
      .addCase(addTodoAsync.pending, state => {
        state.loading = true;
      })
      .addCase(updateTodoAsync.pending, state => {
        state.loading = true;
      })
      .addCase(deleteTodoAsync.pending, state => {
        state.loading = true;
      });
  },
});

export { getTodosAsync };
export default todoSlice.reducer;
