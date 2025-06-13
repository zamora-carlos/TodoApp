import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ModalState = {
  isVisible: boolean;
  todoId: number | null;
};

const initialState: ModalState = {
  isVisible: false,
  todoId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showCreateModal: state => {
      state.isVisible = true;
      state.todoId = null;
    },
    showEditModal: (state, action: PayloadAction<number | null>) => {
      state.isVisible = true;
      state.todoId = action.payload;
    },
    hideModal: state => {
      state.isVisible = false;
      state.todoId = null;
    },
  },
});

export const { showCreateModal, showEditModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
