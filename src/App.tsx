import { useState } from 'react';
import Metrics from '@components/Metrics';
import SearchForm from '@components/SearchForm';
import TodoList from '@components/TodoList';
import Toast from '@components/Toast';
import TodosTable from '@components/TodosTable';
import TodoModal from '@components/TodoModal';

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
      <div style={{ marginBlock: '10rem' }}>
        <TodosTable />
      </div>
      <Metrics />

      <TodoModal />

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
