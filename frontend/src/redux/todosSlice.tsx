import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import PaginatedTodosResponse from '../types/PaginatedResponse';
import TodoPayload from '../types/TodoPayload';
import { ViewOptionsState } from './viewOptionsSlice';
import { ModalState } from './modalSlice';

type TodosState = PaginatedTodosResponse & {
  loading: boolean;
  error: string | null;
};

type RootState = {
  todos: TodosState;
  viewOptions: ViewOptionsState;
  modal: ModalState;
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
    const state = getState();
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
  TodoPayload,
  { state: RootState }
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
  { id: number; todo: TodoPayload },
  { state: RootState }
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
  { state: RootState }
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
    const endpoint = `http://localhost:9090/todos/${id}/${done ? 'done' : 'undone'}`;

    await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    thunkAPI.dispatch(getTodosAsync());
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
