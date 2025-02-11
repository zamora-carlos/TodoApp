import Metrics from './components/Metrics';
import Modal from './components/Modal';
import SearchForm from './components/SearchForm';
import TodoList from './components/TodoList';
import metrics from './data/metrics';
import todos from './data/todos';

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold text-slate-800">My todo list</h1>
      <SearchForm />
      <TodoList todos={todos} />
      <Metrics metrics={metrics} />
      <Modal />
    </>
  );
}

export default App;
