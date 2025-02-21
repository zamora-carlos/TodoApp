import { useState } from 'react';
import Metrics from './components/Metrics';
import Modal from './components/Modal';
import SearchForm from './components/SearchForm';
import TodoList from './components/TodoList';
import Toast from './components/Toast';

function App() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  return (
    <main className="my-12 w-9/10 max-w-6xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
        My todo list
      </h1>
      <SearchForm />
      <TodoList setToast={setToast} />
      <Metrics />
      <Modal setToast={setToast} />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}

export default App;
