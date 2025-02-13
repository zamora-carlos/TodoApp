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
    const response = await fetch('http://localhost:9090/todos');

    if (response.ok) {
      const todos: Todo[] = await response.json();
      return todos;
    }

    return rejectWithValue('Failed to fetch data');
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getTodosAsync.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      }
    );
  },
});

export { getTodosAsync };
export default todoSlice.reducer;
