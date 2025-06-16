import { useDispatch, useSelector } from 'react-redux';
import Modal from '@common/Modal';
import TodoForm from '@components/TodoForm';
import { addTodoAsync, updateTodoAsync } from '@src/redux/todosSlice';
import { hideModal } from '@src/redux/modalSlice';
import type { AppDispatch, RootState } from '@src/redux/store';
import type { TodoPayload } from '@customTypes/todoPayload';

function TodoModal() {
  const dispatch = useDispatch<AppDispatch>();
  const modalState = useSelector((state: RootState) => state.modal);
  const { content: todos } = useSelector((state: RootState) => state.todos);

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
        console.log(todo);
        dispatch(
          updateTodoAsync({
            id: modalState.todoId,
            todo,
          })
        );
      } else {
        dispatch(addTodoAsync(todo));
      }
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  return (
    <Modal isOpen={modalState.isVisible} onClose={handleClose}>
      <TodoForm todo={todoPayload} onSubmit={handleSubmit} />
    </Modal>
  );
}

export default TodoModal;
