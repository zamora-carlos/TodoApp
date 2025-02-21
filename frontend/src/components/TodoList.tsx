import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosAsync } from '../redux/todosSlice';
import TodoListHeaderControls from './TodoListHeaderControls';
import TodoListHeader from './TodoListHeader';
import TodoListRow from './TodoListRow';
import TodoListPaginationInfo from './TodoListPaginationInfo';
import type { AppDispatch, RootState } from '../redux/store';

function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const pagination = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <section className="mt-16">
      <TodoListHeaderControls />

      <div className="overflow-x-auto w-full">
        <div className="border border-slate-300 rounded-2xl overflow-hidden mt-2 min-w-2xl">
          <table className="table-fixed w-full">
            <TodoListHeader />

            <tbody className="text-slate-600">
              {pagination.content.map(todo => (
                <TodoListRow key={todo.id} todo={todo} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TodoListPaginationInfo pagination={pagination} />
    </section>
  );
}

export default TodoList;
