import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../redux/todosSlice';
import viewOptionsReducer from '../redux/viewOptionsSlice';
import modalReducer from '../redux/modalSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    viewOptions: viewOptionsReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
