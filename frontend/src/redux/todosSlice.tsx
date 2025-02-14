import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import PaginatedTodosResponse from '../types/PaginatedResponse';
import Filter from '../types/Filter';
import CreateTodo from '../types/CreateTodo';

// Initial state type
type TodosState = PaginatedTodosResponse & {
  loading: boolean;
  error: string | null;
};

// Initial state
const initialState: TodosState = {
  content: [],
  currentPage: 0,
  totalPages: 0,
  pageSize: 10,
  totalItems: 0,
  filter: {
    name: null,
    priority: null,
    done: null,
  },
  loading: false,
  error: null,
};

export const getTodosAsync = createAsyncThunk<PaginatedTodosResponse, Filter>(
  'todos/fetchTodos',
  async (filter, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filter.done !== null) queryParams.append('done', String(filter.done));
      if (filter.name !== null) queryParams.append('name', filter.name);
      if (filter.priority !== null)
        queryParams.append('priority', filter.priority);
      queryParams.append('page', '1');
      queryParams.append('size', '10');

      const response = await fetch(
        `http://localhost:9090/todos?${queryParams.toString()}`
      );
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data: PaginatedTodosResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addTodoAsync = createAsyncThunk<void, CreateTodo>(
  'todos/addTodoAsync',
  async (todo, thunkAPI) => {
    try {
      await fetch('http://localhost:9090/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });

      const state = thunkAPI.getState() as { todos: TodosState };
      thunkAPI.dispatch(getTodosAsync(state.todos.filter));
    } catch {
      return thunkAPI.rejectWithValue('Error creating new todo');
    }
  }
);

export const updateTodoAsync = createAsyncThunk<
  void,
  { id: number; todo: CreateTodo }
>('todos/updateTodoAsync', async ({ id, todo }, thunkAPI) => {
  try {
    await fetch(`http://localhost:9090/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });

    const state = thunkAPI.getState() as { todos: TodosState };
    thunkAPI.dispatch(getTodosAsync(state.todos.filter));
  } catch {
    return thunkAPI.rejectWithValue('Error updating todo');
  }
});

export const deleteTodoAsync = createAsyncThunk<void, number>(
  'todos/deleteTodoAsync',
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:9090/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const state = thunkAPI.getState() as { todos: TodosState };
      thunkAPI.dispatch(getTodosAsync(state.todos.filter));
    } catch {
      return thunkAPI.rejectWithValue('Error deleting todo');
    }
  }
);

export const toggleTodoAsync = createAsyncThunk<
  { id: number; done: boolean },
  { id: number; done: boolean }
>('todos/toggleTodoAsync', async ({ id, done }, thunkAPI) => {
  try {
    const endpoint = `http://localhost:9090/todos/${id}/${done ? 'done' : 'undone'}`;

    await fetch(endpoint, {
      method: done ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    return { id, done };
  } catch {
    return thunkAPI.rejectWithValue('Error deleting todo');
  }
});

// Slice
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTodosAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTodosAsync.fulfilled,
        (state, action: PayloadAction<PaginatedTodosResponse>) => {
          state.loading = false;
          state.content = action.payload.content;
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
          state.currentPage = action.payload.currentPage;
          state.pageSize = action.payload.pageSize;
          state.filter = action.payload.filter;
        }
      )
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        toggleTodoAsync.fulfilled,
        (state, action: PayloadAction<{ id: number; done: boolean }>) => {
          const todo = state.content.find(
            todo => todo.id === action.payload.id
          );
          if (todo) {
            todo.done = action.payload.done;
          }
        }
      );
  },
});

export default todosSlice.reducer;
