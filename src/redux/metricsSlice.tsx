import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import todosApiService from '../services/todosApiService';
import type Metrics from '../types/Metrics';
import type { RootState } from './store';

export type MetricsState = Metrics & {
  loading: boolean;
  error: string | null;
};

const initialState: MetricsState = {
  avgTime: 0,
  avgTimeLow: 0,
  avgTimeMedium: 0,
  avgTimeHigh: 0,
  loading: false,
  error: null,
};

export const getMetricsAsync = createAsyncThunk<
  Metrics,
  void,
  { state: RootState }
>('metrics/getAvgTimes', async (_, { rejectWithValue }) => {
  try {
    return await todosApiService.fetchMetrics();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMetricsAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMetricsAsync.fulfilled,
        (state, action: PayloadAction<Metrics>) => {
          state.loading = false;
          state.avgTime = action.payload.avgTime;
          state.avgTimeLow = action.payload.avgTimeLow;
          state.avgTimeMedium = action.payload.avgTimeMedium;
          state.avgTimeHigh = action.payload.avgTimeHigh;
        }
      )
      .addCase(getMetricsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default metricsSlice.reducer;
