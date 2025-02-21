import AddTodoButton from './AddTodoButton';
import Pagination from './Pagination';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import {
  getTodosAsync,
  deleteTodoAsync,
  toggleTodoAsync,
  changePageSizeAsync,
} from '../redux/todosSlice';
import SortCriteria from '../types/SortCriteria';
import { showCreateModal, showEditModal } from '../redux/modalSlice';
import { updateSortBy } from '../redux/viewOptionsSlice';

function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const { sortBy, order } = useSelector(
    (state: RootState) => state.viewOptions.sortCriteria
  );
  const pagination = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoAsync(id));
  };

  const handleToggleTodo = (id: number, done: boolean) => {
    dispatch(toggleTodoAsync({ id, done }));
  };

  const handleChangePageSize = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const pageSize = parseInt(evt.target.value);

    dispatch(changePageSizeAsync(pageSize));
  };

  function isValidSortBy(value: string): value is SortCriteria['sortBy'] {
    return ['TEXT', 'PRIORITY', 'DUE_DATE'].includes(value);
  }

  const handleUpdateSorting = (newSortBy: string) => {
    if (isValidSortBy(newSortBy)) {
      dispatch(updateSortBy(newSortBy));
      dispatch(getTodosAsync());
    }
  };

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between">
        <AddTodoButton onClick={() => dispatch(showCreateModal())} />
        <div className="flex items-center gap-2">
          <p className="text-base text-slate-500">Todos per page</p>

          <div className="relative group">
            <select
              className="text-slate-500 p-2 pr-6 bg-transparent border border-slate-300 rounded-lg browser-appearance-none"
              onChange={handleChangePageSize}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>

            <TbTriangleInvertedFilled className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400 text-xs group-hover:text-slate-500 transition-colors-duration-200" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <div className="border border-slate-300 rounded-2xl overflow-hidden mt-2 min-w-2xl">
          <table className="w-full">
            <thead className="font-semibold text-slate-700 text-left">
              <tr>
                <th className="py-3 px-4 border-b border-slate-300">State</th>

                <th
                  className="py-3 px-4 border border-y-0 border-slate-300"
                  onClick={() => handleUpdateSorting('TEXT')}
                >
                  <div className="flex items-center gap-1">
                    Name
                    <div className="flex flex-col">
                      <GoTriangleUp
                        className={
                          sortBy === 'TEXT' && order === 'ASC'
                            ? 'text-lg text-indigo-400'
                            : 'text-lg text-slate-300'
                        }
                      />
                      <GoTriangleDown
                        className={
                          sortBy === 'TEXT' && order === 'DESC'
                            ? 'text-lg text-indigo-400 -mt-2'
                            : 'text-lg text-slate-300 -mt-2'
                        }
                      />
                    </div>
                  </div>
                </th>

                <th
                  className="py-3 px-4 border border-y-0 border-slate-300"
                  onClick={() => handleUpdateSorting('PRIORITY')}
                >
                  <div className="flex items-center gap-1">
                    Priority
                    <div className="flex flex-col">
                      <GoTriangleUp
                        className={
                          sortBy === 'PRIORITY' && order === 'ASC'
                            ? 'text-lg text-indigo-400'
                            : 'text-lg text-slate-300'
                        }
                      />
                      <GoTriangleDown
                        className={
                          sortBy === 'PRIORITY' && order === 'DESC'
                            ? 'text-lg text-indigo-400 -mt-2'
                            : 'text-lg text-slate-300 -mt-2'
                        }
                      />
                    </div>
                  </div>
                </th>

                <th
                  className="py-3 px-4 border border-y-0 border-slate-300"
                  onClick={() => handleUpdateSorting('DUE_DATE')}
                >
                  <div className="flex items-center gap-1">
                    Due date
                    <div className="flex flex-col">
                      <GoTriangleUp
                        className={
                          sortBy === 'DUE_DATE' && order === 'ASC'
                            ? 'text-lg text-indigo-400'
                            : 'text-lg text-slate-300'
                        }
                      />
                      <GoTriangleDown
                        className={
                          sortBy === 'DUE_DATE' && order === 'DESC'
                            ? 'text-lg text-indigo-400 -mt-2'
                            : 'text-lg text-slate-300 -mt-2'
                        }
                      />
                    </div>
                  </div>
                </th>

                <th className="py-3 px-4 border-b border-slate-300">Actions</th>
              </tr>
            </thead>

            <tbody className="text-slate-600">
              {pagination.content.map(todo => (
                <tr key={todo.id}>
                  <td className="py-2 px-4 border border-l-0 border-b-0 border-slate-300">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => handleToggleTodo(todo.id, !todo.done)}
                    />
                  </td>
                  <td className="py-2 px-4 border border-b-0 border-slate-300">
                    {todo.text}
                  </td>
                  <td className="py-2 px-4 border border-b-0 border-slate-300">
                    {todo.priority}
                  </td>
                  <td className="py-2 px-4 border border-b-0 border-slate-300">
                    {todo.dueDate}
                  </td>
                  <td className="py-2 px-4 border border-r-0 border-b-0 border-slate-300">
                    <button
                      onClick={() => dispatch(showEditModal(todo.id))}
                      className="border-0 cursor-pointer text-slate-400 hover:text-slate-500"
                    >
                      <HiPencil className="text-xl" />
                      <span className="sr-only">Edit</span>
                    </button>{' '}
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="border-0 cursor-pointer text-slate-400 hover:text-slate-500"
                    >
                      <HiTrash className="text-xl" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-base text-slate-500">
          {pagination.totalItems > 0 && (
            <span>
              Showing {(pagination.currentPage - 1) * pagination.pageSize + 1}{' '}
              to{' '}
              {(pagination.currentPage - 1) * pagination.pageSize +
                pagination.content.length}{' '}
              todos of {pagination.totalItems}
            </span>
          )}
        </p>
        <Pagination
          page={pagination.currentPage}
          maxPage={Math.max(1, pagination.totalPages)}
        />
      </div>
    </section>
  );
}

export default TodoList;
