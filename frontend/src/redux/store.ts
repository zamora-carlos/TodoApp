import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../redux/todosSlice';

const store = configureStore({
  reducer: { todos: todoReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
