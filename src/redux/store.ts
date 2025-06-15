import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '@src/redux/todosSlice';
import viewOptionsReducer from '@src/redux/viewOptionsSlice';
import modalReducer from '@src/redux/modalSlice';
import metricsReducer from '@src/redux/metricsSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    viewOptions: viewOptionsReducer,
    modal: modalReducer,
    metrics: metricsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
