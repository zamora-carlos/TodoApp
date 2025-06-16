import { useDispatch, useSelector } from 'react-redux';
import Modal from '@common/Modal';
import TodoForm from '@components/TodoForm';
import { addTodoAsync, updateTodoAsync } from '@src/redux/todosSlice';
import { hideModal } from '@src/redux/modalSlice';
import useToast from '@hooks/useToast';
import type { AppDispatch, RootState } from '@src/redux/store';
import type { TodoPayload } from '@customTypes/todoPayload';

function TodoModal() {
  const dispatch = useDispatch<AppDispatch>();
  const modalState = useSelector((state: RootState) => state.modal);
  const { content: todos, error } = useSelector(
    (state: RootState) => state.todos
  );
  const { showSuccess, showError } = useToast();

  const todoToEdit =
    modalState.todoId != null
      ? todos.find(todo => todo.id === modalState.todoId)
      : undefined;

  const todoPayload: TodoPayload | undefined = todoToEdit
    ? {
        text: todoToEdit.text,
        priority: todoToEdit.priority,
        dueDate: todoToEdit.dueDate,
      }
    : undefined;

  const handleClose = () => {
    dispatch(hideModal());
  };

  const handleSubmit = async (todo: TodoPayload) => {
    try {
      if (modalState.todoId) {
        await dispatch(
          updateTodoAsync({
            id: modalState.todoId,
            todo,
          })
        ).unwrap();
        showSuccess('Todo updated successfully!');
      } else {
        await dispatch(addTodoAsync(todo)).unwrap();
        showSuccess('Todo created successfully!');
      }

      handleClose();
    } catch {
      const errorMessage = modalState.todoId
        ? 'Failed to update todo. Please try again.'
        : 'Failed to create todo. Please try again.';

      showError(error || errorMessage);
    }
  };

  return (
    <Modal isOpen={modalState.isVisible} onClose={handleClose}>
      <TodoForm todo={todoPayload} onSubmit={handleSubmit} />
    </Modal>
  );
}

export default TodoModal;
