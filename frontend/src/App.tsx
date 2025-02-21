import Metrics from './components/Metrics';
import Modal from './components/Modal';
import SearchForm from './components/SearchForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <main className="my-12 w-9/10 max-w-6xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
        My todo list
      </h1>
      <SearchForm />
      <TodoList />
      <Metrics />
      <Modal />
    </main>
  );
}

export default App;
