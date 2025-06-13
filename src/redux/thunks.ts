import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateSortBy, updateFilter } from './viewOptionsSlice';
import { getTodosAsync, changePage } from './todosSlice';
import type { RootState } from './store';
import type SortCriteria from '../types/SortCriteria';
import type Filter from '../types/Filter';

export const updateSortAndFetchTodosAsync = createAsyncThunk<
  void,
  SortCriteria['sortBy'],
  { state: RootState }
>('shared/updateSortAndFetchTodos', async (columnName, thunkAPI) => {
  thunkAPI.dispatch(updateSortBy(columnName));
  thunkAPI.dispatch(getTodosAsync());
});

export const updateFilterAndChangePageAsync = createAsyncThunk<
  void,
  Filter,
  { state: RootState }
>('shared/updateFilterAndChangePage', async (filter, thunkAPI) => {
  thunkAPI.dispatch(updateFilter(filter));
  thunkAPI.dispatch(changePage(1));
});
