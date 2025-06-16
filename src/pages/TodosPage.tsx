import Metrics from '@components/Metrics';
import SearchForm from '@components/SearchForm';
import TodosTableView from '@components/TodosTableView';
import TodoModal from '@components/TodoModal';
import PageTitle from '@components/PageTitle';
import ToastContainer from '@common/Toast';

function TodoPage() {
  return (
    <>
      <PageTitle title="My todo list" />
      <SearchForm />
      <TodosTableView />
      <Metrics />
      <TodoModal />
      <ToastContainer />
    </>
  );
}

export default TodoPage;
