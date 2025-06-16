import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Toast } from '@customTypes/toast';

export type ToastState = {
  toasts: Toast[];
  maxToasts: number;
};

const initialState: ToastState = {
  toasts: [],
  maxToasts: 3, // Maximum number of toasts to show at once
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<Omit<Toast, 'id' | 'timestamp'>>
    ) => {
      const newToast: Toast = {
        ...action.payload,
        id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        timestamp: Date.now(),
      };

      state.toasts.push(newToast);

      // Remove oldest toasts if we exceed maxToasts
      if (state.toasts.length > state.maxToasts) {
        state.toasts = state.toasts.slice(-state.maxToasts);
      }
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    clearAllToasts: state => {
      state.toasts = [];
    },
    setMaxToasts: (state, action: PayloadAction<number>) => {
      state.maxToasts = Math.max(1, action.payload);
      // Trim toasts if new max is smaller
      if (state.toasts.length > state.maxToasts) {
        state.toasts = state.toasts.slice(-state.maxToasts);
      }
    },
  },
});

export const { addToast, removeToast, clearAllToasts, setMaxToasts } =
  toastSlice.actions;

export default toastSlice.reducer;
