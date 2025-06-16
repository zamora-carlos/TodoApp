import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '@src/redux/todosSlice';
import viewOptionsReducer from '@src/redux/viewOptionsSlice';
import modalReducer from '@src/redux/modalSlice';
import metricsReducer from '@src/redux/metricsSlice';
import toastReducer from '@src/redux/toastSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    viewOptions: viewOptionsReducer,
    modal: modalReducer,
    metrics: metricsReducer,
    toast: toastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
