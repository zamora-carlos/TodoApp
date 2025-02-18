import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Metrics from '../types/Metrics';
import { TodosState } from './todosSlice';
import { ViewOptionsState } from './viewOptionsSlice';
import { ModalState } from './modalSlice';

export type MetricsState = Metrics & {
  loading: boolean;
  error: string | null;
};

type RootState = {
  todos: TodosState;
  viewOptions: ViewOptionsState;
  modal: ModalState;
  metrics: MetricsState;
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
    const response = await fetch(`http://localhost:9090/todos/metrics`);
    if (!response.ok) throw new Error('Failed to fetch metrics');
    const data: Metrics = await response.json();
    return data;
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
