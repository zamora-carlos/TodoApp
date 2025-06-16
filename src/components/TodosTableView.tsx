import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodosTableControls from '@components/TodosTableControls';
import TodosTable from '@components/TodosTable';
import TodosTableFooter from '@components/TodosTableFooter';
import { getTodosAsync } from '@src/redux/todosSlice';
import type { AppDispatch, RootState } from '@src/redux/store';

function TodosTableView() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    content: todos,
    error,
    loading,
  } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const renderContent = () => {
    if (error) {
      return (
        <p className="text-red-300 text-sm font-medium my-48 text-center">
          {error}
        </p>
      );
    }

    if (todos.length === 0 && !loading) {
      return (
        <p className="text-slate-400 text-sm font-medium my-48 text-center">
          No todos found
        </p>
      );
    }

    return <TodosTable />;
  };

  return (
    <section className="mt-16">
      <TodosTableControls />
      {renderContent()}
      <TodosTableFooter />
    </section>
  );
}

export default TodosTableView;
