import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SortCriteria from '../types/SortCriteria';
import Filter from '../types/Filter';

type FilterState = {
  sortCriteria: SortCriteria;
  filter: Filter;
  pageSize: number;
};

const initialState: FilterState = {
  sortCriteria: {
    sortBy: 'TEXT',
    order: 'ASC',
  },
  filter: {
    name: null,
    priority: null,
    done: null,
  },
  pageSize: 10,
};

const viewOptionsSlice = createSlice({
  name: 'viewOptions',
  initialState,
  reducers: {
    updateSortCriteria: (state, action: PayloadAction<SortCriteria>) => {
      state.sortCriteria = action.payload;
    },
    updateSortBy: (
      state,
      action: PayloadAction<'TEXT' | 'PRIORITY' | 'DUE_DATE'>
    ) => {
      state.sortCriteria.sortBy = action.payload;
    },
    updateSortOrder: (state, action: PayloadAction<'ASC' | 'DESC'>) => {
      state.sortCriteria.order = action.payload;
    },
    updateFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    updateFilterName: (state, action: PayloadAction<string | null>) => {
      state.filter.name = action.payload;
    },
    updateFilterPriority: (
      state,
      action: PayloadAction<'LOW' | 'MEDIUM' | 'HIGH' | null>
    ) => {
      state.filter.priority = action.payload;
    },
    updateFilterDone: (state, action: PayloadAction<boolean | null>) => {
      state.filter.done = action.payload;
    },
    updatePageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  updateSortCriteria,
  updateSortBy,
  updateSortOrder,
  updateFilter,
  updateFilterName,
  updateFilterPriority,
  updateFilterDone,
} = viewOptionsSlice.actions;

export default viewOptionsSlice.reducer;
