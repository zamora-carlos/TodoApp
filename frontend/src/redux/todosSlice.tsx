import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import PaginatedTodosResponse from '../types/PaginatedResponse';
import CreateTodo from '../types/TodoPayload';
import { ViewOptionsState } from './viewOptionsSlice';

type TodosState = PaginatedTodosResponse & {
  loading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  content: [],
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  totalItems: 0,
  loading: false,
  error: null,
};

export const getTodosAsync = createAsyncThunk<
  PaginatedTodosResponse,
  void,
  { state: { viewOptions: ViewOptionsState } }
>('todos/fetchTodos', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as {
      viewOptions: ViewOptionsState;
      todos: TodosState;
    };
    const viewOptions = state.viewOptions;
    const currentPage = state.todos.currentPage;
    const pageSize = state.todos.pageSize;

    const queryParams = new URLSearchParams();
    if (viewOptions.filter.done !== null) {
      queryParams.append('done', String(viewOptions.filter.done));
    }

    if (viewOptions.filter.name !== null) {
      queryParams.append('text', viewOptions.filter.name);
    }

    if (viewOptions.filter.priority !== null) {
      queryParams.append('priority', viewOptions.filter.priority);
    }

    queryParams.append('order', viewOptions.sortCriteria.order);
    queryParams.append('sort_by', viewOptions.sortCriteria.sortBy);

    queryParams.append('page', String(currentPage));
    queryParams.append('size', String(pageSize));

    const response = await fetch(
      `http://localhost:9090/todos?${queryParams.toString()}`
    );
    if (!response.ok) throw new Error('Failed to fetch todos');
    const data: PaginatedTodosResponse = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const addTodoAsync = createAsyncThunk<
  void,
  CreateTodo,
  { state: { viewOptions: ViewOptionsState } }
>('todos/addTodoAsync', async (todo, thunkAPI) => {
  try {
    await fetch('http://localhost:9090/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });

    thunkAPI.dispatch(getTodosAsync());
  } catch {
    return thunkAPI.rejectWithValue('Error creating new todo');
  }
});

export const updateTodoAsync = createAsyncThunk<
  void,
  { id: number; todo: CreateTodo },
  { state: { viewOptions: ViewOptionsState } }
>('todos/updateTodoAsync', async ({ id, todo }, thunkAPI) => {
  try {
    await fetch(`http://localhost:9090/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });

    thunkAPI.dispatch(getTodosAsync());
  } catch {
    return thunkAPI.rejectWithValue('Error updating todo');
  }
});

export const deleteTodoAsync = createAsyncThunk<
  void,
  number,
  { state: { viewOptions: ViewOptionsState } }
>('todos/deleteTodoAsync', async (id, thunkAPI) => {
  try {
    await fetch(`http://localhost:9090/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    thunkAPI.dispatch(getTodosAsync());
  } catch {
    return thunkAPI.rejectWithValue('Error deleting todo');
  }
});

export const changePageAsync = createAsyncThunk<
  void,
  number,
  { state: { viewOptions: ViewOptionsState } }
>('viewOptions/changePageAsync', async (page, thunkAPI) => {
  thunkAPI.dispatch(changePage(page));
  thunkAPI.dispatch(getTodosAsync());
});

export const changePageSizeAsync = createAsyncThunk<
  void,
  number,
  { state: { viewOptions: ViewOptionsState } }
>('viewOptions/changePageSizeAsync', async (page, thunkAPI) => {
  thunkAPI.dispatch(changePageSize(page));
  thunkAPI.dispatch(getTodosAsync());
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
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
