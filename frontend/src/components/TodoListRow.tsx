import { useDispatch } from 'react-redux';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Checkbox from './Checkbox';
import { deleteTodoAsync, toggleTodoAsync } from '../redux/todosSlice';
import { showEditModal } from '../redux/modalSlice';
import formatDateString from '../utils/formatDateString';
import getDueDateColor from '../utils/getDueDateColor';
import type TodoResponse from '../types/TodoResponse';
import type { AppDispatch } from '../redux/store';

type TodoListRowProps = {
  todo: TodoResponse;
};

function TodoListRow({ todo }: TodoListRowProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = () =>
    dispatch(toggleTodoAsync({ id: todo.id, done: !todo.done }));
  const handleDelete = () => dispatch(deleteTodoAsync(todo.id));

  const dueDateColor = todo.dueDate && getDueDateColor(todo.dueDate);
  const priorityLabel =
    todo.priority.charAt(0).toUpperCase() +
    todo.priority.slice(1).toLowerCase();

  return (
    <tr>
      <td className="todo-table-cell border-l-0">
        <Checkbox checked={todo.done} onChange={handleToggle} />
      </td>
      <td
        className={`todo-table-cell ${todo.done ? 'line-through italic text-slate-500' : ''}`}
      >
        {todo.text}
      </td>
      <td className="todo-table-cell">{priorityLabel}</td>
      <td className="todo-table-cell">
        {todo.dueDate && (
          <div className="flex items-center gap-2">
            {formatDateString(todo.dueDate)}
            {!todo.done && (
              <div
                className={`w-3 h-3 rounded-full ${dueDateColor} animate-pulse`}
              />
            )}
          </div>
        )}
      </td>
      <td className="todo-table-cell border-r-0">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => dispatch(showEditModal(todo.id))}
            className="todo-table-icon-btn"
          >
            <HiPencil className="w-6 h-auto" />
            <span className="sr-only">Edit</span>
          </button>
          <button onClick={handleDelete} className="todo-table-icon-btn">
            <HiTrash className="w-6 h-auto" />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TodoListRow;
