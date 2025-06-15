import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateSortBy, updateFilter } from './viewOptionsSlice';
import { getTodosAsync, changePageAsync } from './todosSlice';
import type { RootState } from './store';
import type { Filter } from '@customTypes/filter';
import type { SortBy } from '@customTypes/sortBy';

export const updateSortAndFetchTodosAsync = createAsyncThunk<
  void,
  SortBy,
  { state: RootState }
>('shared/updateSortAndFetchTodos', async (columnName, thunkAPI) => {
  thunkAPI.dispatch(updateSortBy(columnName));
  thunkAPI.dispatch(getTodosAsync());
});

export const updateFilterAndChangePageAsync = createAsyncThunk<
  void,
  Filter,
  { state: RootState }
>('shared/updateFilterAndChangePageAsync', async (filter, thunkAPI) => {
  thunkAPI.dispatch(updateFilter(filter));
  thunkAPI.dispatch(changePageAsync(1));
});
