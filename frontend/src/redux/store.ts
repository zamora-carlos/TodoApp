import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../redux/todosSlice';
import viewOptionsReducer from '../redux/todosSlice';
import modalReducer from '../redux/todosSlice';

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
