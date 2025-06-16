import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Filter } from '@customTypes/filter';
import type { SortBy } from '@customTypes/sortBy';
import type { SortCriteria } from '@customTypes/sortCriteria';
import { SORT_BY } from '@src/constants/sortBy';
import { SORT_ORDER } from '@src/constants/sortOrder';

export type ViewOptionsState = {
  sortCriteria: SortCriteria;
  filter: Filter;
};

const initialState: ViewOptionsState = {
  sortCriteria: {
    sortBy: SORT_BY.TEXT,
    order: SORT_ORDER.ASC,
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
          state.sortCriteria.order === SORT_ORDER.ASC
            ? SORT_ORDER.DESC
            : SORT_ORDER.ASC;
      } else {
        state.sortCriteria.sortBy = action.payload;
        state.sortCriteria.order = SORT_ORDER.ASC;
      }
    },
    updateFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
});

export const { updateSortBy, updateFilter } = viewOptionsSlice.actions;

export default viewOptionsSlice.reducer;
