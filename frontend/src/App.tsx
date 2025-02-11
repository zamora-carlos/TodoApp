import { useState } from 'react';
import Metrics from './components/Metrics';
import Modal from './components/Modal';
import SearchForm from './components/SearchForm';
import TodoList from './components/TodoList';
import metrics from './data/metrics';
import todos from './data/todos';

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="my-12 max-w-9/10 mx-auto">
      <h1 className="text-4xl font-bold text-slate-800">My todo list</h1>
      <SearchForm />
      <TodoList todos={todos} setShowModal={setShowModal} />
      <Metrics metrics={metrics} />
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
}

export default App;
