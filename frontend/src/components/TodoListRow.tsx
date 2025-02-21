import { HiPencil, HiTrash } from 'react-icons/hi2';
import Checkbox from './Checkbox';
import formatDateString from '../utils/formatDateString';
import { showEditModal } from '../redux/modalSlice';
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, toggleTodoAsync } from '../redux/todosSlice';
import type { AppDispatch } from '../redux/store';
import type TodoResponse from '../types/TodoResponse';

type TodoListRowProps = {
  todo: TodoResponse;
};

function TodoListRow({ todo }: TodoListRowProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = () => {
    dispatch(toggleTodoAsync({ id: todo.id, done: !todo.done }));
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync(todo.id));
  };

  return (
    <tr>
      <td className="table-cell border-l-0">
        <Checkbox checked={todo.done} onChange={handleToggle} />
      </td>
      <td className="table-cell">{todo.text}</td>
      <td className="table-cell">{todo.priority}</td>
      <td className="table-cell">
        {todo.dueDate !== null && formatDateString(todo.dueDate)}
      </td>
      <td className="table-cell border-r-0">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => dispatch(showEditModal(todo.id))}
            className="todo-row-icon-btn"
          >
            <HiPencil className="w-6 h-auto" />
            <span className="sr-only">Edit</span>
          </button>
          <button onClick={handleDelete} className="todo-row-icon-btn">
            <HiTrash className="w-6 h-auto" />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TodoListRow;
