import Metrics from '@components/Metrics';
import SearchForm from '@components/SearchForm';
import TodosTableView from '@components/TodosTableView';
import TodoModal from '@components/TodoModal';
import Header from '@components/Header';
import ToastContainer from '@common/Toast';

function App() {
  return (
    <main className="my-12 w-9/10 max-w-6xl mx-auto">
      <Header title="My todo list" />
      <SearchForm />
      <TodosTableView />
      <Metrics />
      <TodoModal />
      <ToastContainer />
    </main>
  );
}

export default App;
