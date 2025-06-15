import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Checkbox from './Checkbox';
import Table from '@common/Table';
import { showEditModal } from '@src/redux/modalSlice';
import {
  deleteTodoAsync,
  getTodosAsync,
  toggleTodoAsync,
} from '@src/redux/todosSlice';
import { updateSortAndFetchTodosAsync } from '@src/redux/thunks';
import formatDateString from '@utils/formatDateString';
import getDueDateColor from '@utils/getDueDateColor';
import { SORT_BY } from '@constants/sortBy';
import type { AppDispatch, RootState } from '@src/redux/store';
import type { TodoResponse as Todo } from '@customTypes/todoResponse';
import type { TableColumn } from '@customTypes/table';
import type { SortCriteria } from '@customTypes/sortCriteria';

const TodosTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { content: todos } = useSelector((state: RootState) => state.todos);
  const sortCriteria = useSelector(
    (state: RootState) => state.viewOptions.sortCriteria
  );

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDelete = useCallback(
    (todo: Todo) => {
      dispatch(deleteTodoAsync(todo.id));
    },
    [dispatch]
  );

  const handleToggle = useCallback(
    (todo: Todo) => {
      dispatch(toggleTodoAsync({ id: todo.id, done: !todo.done }));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (todo: Todo) => {
      dispatch(showEditModal(todo.id));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (column: TableColumn<Todo>) => {
      const sortBy = column.name as SortCriteria['sortBy'];
      dispatch(updateSortAndFetchTodosAsync(sortBy));
    },
    [dispatch]
  );

  const columns: TableColumn<Todo>[] = useMemo(
    () => [
      {
        label: 'Status',
        className: 'text-center w-24',
        sortable: false,
        name: 'DONE',
        content: todo => (
          <Checkbox checked={todo.done} onChange={() => handleToggle(todo)} />
        ),
      },
      {
        label: 'Name',
        className: '',
        sortable: true,
        name: SORT_BY.TEXT,
        content: todo => (
          <span
            className={todo.done ? 'line-through italic text-slate-500' : ''}
          >
            {todo.text}
          </span>
        ),
      },
      {
        label: 'Priority',
        className: 'w-28 md:w-32 lg:w-36',
        sortable: true,
        name: SORT_BY.PRIORITY,
        content: todo =>
          todo.priority.charAt(0).toUpperCase() +
          todo.priority.slice(1).toLowerCase(),
      },
      {
        label: 'Due date',
        className: 'w-44 sm:w-48 md:w-52 lg:w-56 xl:w-60',
        sortable: true,
        name: SORT_BY.DUE_DATE,
        content: todo =>
          todo.dueDate && (
            <div className="flex items-center gap-2">
              {formatDateString(todo.dueDate)}
              {!todo.done && (
                <div
                  className={`w-3 h-3 rounded-full ${getDueDateColor(todo.dueDate)} animate-pulse`}
                />
              )}
            </div>
          ),
      },
      {
        label: 'Actions',
        className: 'text-center w-30',
        sortable: false,
        name: 'ACTIONS',
        content: todo => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleEdit(todo)}
              className="todo-table-icon-btn"
            >
              <HiPencil className="w-6 h-auto" />
              <span className="sr-only">Edit</span>
            </button>
            <button
              onClick={() => handleDelete(todo)}
              className="todo-table-icon-btn"
            >
              <HiTrash className="w-6 h-auto" />
              <span className="sr-only">Delete</span>
            </button>
          </div>
        ),
      },
    ],
    [handleToggle, handleEdit, handleDelete]
  );

  return (
    <Table
      columns={columns}
      data={todos}
      sortColumn={{ order: sortCriteria.order, column: sortCriteria.sortBy }}
      onSort={handleSort}
    />
  );
};

export default TodosTable;
