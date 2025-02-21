import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type SortCriteria from '../types/SortCriteria';
import type Filter from '../types/Filter';

export type ViewOptionsState = {
  sortCriteria: SortCriteria;
  filter: Filter;
};

const initialState: ViewOptionsState = {
  sortCriteria: {
    sortBy: 'TEXT',
    order: 'ASC',
  },
  filter: {
    name: null,
    priority: null,
    done: null,
  },
};

const viewOptionsSlice = createSlice({
  name: 'viewOptions',
  initialState,
  reducers: {
    updateSortBy: (
      state,
      action: PayloadAction<'TEXT' | 'PRIORITY' | 'DUE_DATE'>
    ) => {
      if (state.sortCriteria.sortBy === action.payload) {
        state.sortCriteria.order =
          state.sortCriteria.order === 'ASC' ? 'DESC' : 'ASC';
      } else {
        state.sortCriteria.sortBy = action.payload;
        state.sortCriteria.order = 'ASC';
      }
    },
    updateFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
});

export const { updateSortBy, updateFilter } = viewOptionsSlice.actions;

export default viewOptionsSlice.reducer;
