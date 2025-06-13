import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Filter } from '../types/Filter';
import type { SortBy } from '../types/SortBy';
import type { SortCriteria } from '../types/SortCriteria';

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
    updateSortBy: (state, action: PayloadAction<SortBy>) => {
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
