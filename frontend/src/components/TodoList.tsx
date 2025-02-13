import Todo from '../types/Todo';
import AddTodoButton from './AddTodoButton';
import Pagination from './Pagination';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { getTodosAsync } from '../redux/todoSlice';

type TodoListProps = {
  todos: Todo[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function TodoList({ setShowModal }: TodoListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleShowModal = () => setShowModal(true);
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between">
        <AddTodoButton onClick={handleShowModal} />
        <div className="flex items-center gap-2">
          <p className="text-base text-slate-500">Todos per page</p>

          <div className="relative group">
            <select className="text-slate-500 p-2 pr-6 bg-transparent border border-slate-300 rounded-lg browser-appearance-none">
              <option selected>10</option>
              <option>15</option>
              <option>20</option>
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

                <th className="py-3 px-4 border border-y-0 border-slate-300">
                  <div className="flex items-center gap-1">
                    Name
                    <div className="flex flex-col">
                      <GoTriangleUp className="text-slate-400" />
                      <GoTriangleDown className="text-slate-400 -mt-2" />
                    </div>
                  </div>
                </th>

                <th className="py-3 px-4 border border-y-0 border-slate-300">
                  <div className="flex items-center gap-1">
                    Priority
                    <div className="flex flex-col">
                      <GoTriangleUp className="text-slate-400" />
                      <GoTriangleDown className="text-slate-400 -mt-2" />
                    </div>
                  </div>
                </th>

                <th className="py-3 px-4 border border-y-0 border-slate-300">
                  <div className="flex items-center gap-1">
                    Due date
                    <div className="flex flex-col">
                      <GoTriangleUp className="text-slate-400" />
                      <GoTriangleDown className="text-slate-400 -mt-2" />
                    </div>
                  </div>
                </th>

                <th className="py-3 px-4 border-b border-slate-300">Actions</th>
              </tr>
            </thead>

            <tbody className="text-slate-600">
              {todos.map(todo => (
                <tr key={todo.id}>
                  <td className="py-2 px-4 border border-l-0 border-b-0 border-slate-300">
                    <input type="checkbox" checked={todo.state} />
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
                      onClick={handleShowModal}
                      className="border-0 cursor-pointer text-slate-400 hover:text-slate-500"
                    >
                      <HiPencil className="text-xl" />
                      <span className="sr-only">Edit</span>
                    </button>{' '}
                    <button
                      onClick={handleShowModal}
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
        <p className="text-base text-slate-500">Showing 1 to 10 todos of 43</p>
        <Pagination page={1} maxPage={5} />
      </div>
    </section>
  );
}

export default TodoList;
