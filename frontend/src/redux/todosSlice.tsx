import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { getMetricsAsync } from './metricsSlice';
import todosApiService from '../services/todosApiService';
import buildQueryParams from '../utils/buildQueryParams';
import type PaginatedTodosResponse from '../types/PaginatedResponse';
import type TodoPayload from '../types/TodoPayload';
import type { RootState } from './store';

export type TodosState = PaginatedTodosResponse & {
  loading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  content: [],
  currentPage: 1,
  totalPages: 0,
  pageSize: 10,
  totalItems: 0,
  loading: false,
  error: null,
};

export const getTodosAsync = createAsyncThunk<
  PaginatedTodosResponse,
  void,
  { state: RootState }
>('todos/fetchTodos', async (_, { getState, rejectWithValue }) => {
  try {
    const queryParams = buildQueryParams(getState());
    return await todosApiService.fetchTodos(queryParams);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const addTodoAsync = createAsyncThunk<
  void,
  TodoPayload,
  { state: RootState }
>('todos/addTodoAsync', async (todo, thunkAPI) => {
  try {
    await todosApiService.createTodo(todo);
    thunkAPI.dispatch(getTodosAsync());
  } catch {
    return thunkAPI.rejectWithValue('Error creating new todo');
  }
});

export const updateTodoAsync = createAsyncThunk<
  void,
  { id: number; todo: TodoPayload },
  { state: RootState }
>('todos/updateTodoAsync', async ({ id, todo }, thunkAPI) => {
  try {
    await todosApiService.updateTodo(id, todo);
    thunkAPI.dispatch(getTodosAsync());
    thunkAPI.dispatch(getMetricsAsync());
  } catch {
    return thunkAPI.rejectWithValue('Error updating todo');
  }
});

export const deleteTodoAsync = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('todos/deleteTodoAsync', async (id, thunkAPI) => {
  try {
    await todosApiService.deleteTodo(id);

    const { todos } = thunkAPI.getState();

    // If we are on the last page and there is only one todo
    if (todos.content.length === 1) {
      thunkAPI.dispatch(changePage(todos.currentPage - 1));
    }

    thunkAPI.dispatch(getTodosAsync());
    thunkAPI.dispatch(getMetricsAsync());
  } catch {
    return thunkAPI.rejectWithValue('Error deleting todo');
  }
});

export const changePageAsync = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('todos/changePageAsync', async (page, thunkAPI) => {
  thunkAPI.dispatch(changePage(page));
  thunkAPI.dispatch(getTodosAsync());
});

export const changePageSizeAsync = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('todos/changePageSizeAsync', async (page, thunkAPI) => {
  thunkAPI.dispatch(changePageSize(page));
  thunkAPI.dispatch(getTodosAsync());
});

export const toggleTodoAsync = createAsyncThunk<
  void,
  { id: number; done: boolean },
  { state: RootState }
>('todos/toggleTodoAsync', async ({ id, done }, thunkAPI) => {
  try {
    await todosApiService.toggleTodoStatus(id, done);
    thunkAPI.dispatch(getTodosAsync());
    thunkAPI.dispatch(getMetricsAsync());
  } catch {
    return thunkAPI.rejectWithValue('Error updating todo status');
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      state.currentPage = Math.max(1, Math.min(newPage, state.totalPages));
    },
    changePageSize: (state, action: PayloadAction<number>) => {
      const newPageSize = action.payload;

      const todosSeen = state.currentPage * state.pageSize;

      const totalPages = Math.ceil(state.totalItems / newPageSize);

      let newCurrentPage = Math.floor(todosSeen / newPageSize);

      newCurrentPage = Math.min(newCurrentPage, totalPages);

      state.pageSize = newPageSize;
      state.totalPages = totalPages;
      state.currentPage = Math.max(newCurrentPage, 1);
    },
  },
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
        }
      )
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { changePage, changePageSize } = todosSlice.actions;

export default todosSlice.reducer;
