import { useState } from 'react';
import Modal from '@common/Modal';
import Metrics from '@components/Metrics';
import OtherModal from '@components/Modal';
import SearchForm from '@components/SearchForm';
import TodoList from '@components/TodoList';
import Toast from '@components/Toast';
import TodosTable from '@components/TodosTable';
import TodoForm from '@components/TodoForm';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  return (
    <main className="my-12 w-9/10 max-w-6xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
        My todo list
      </h1>
      <button
        onClick={() => setIsOpen(true)}
        style={{ border: '1px solid black', padding: '0.25rem 0.75rem' }}
      >
        Open modal
      </button>
      <SearchForm />
      <TodoList setToast={setToast} />
      <div style={{ marginBlock: '10rem' }}>
        <TodosTable />
      </div>
      <Metrics />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TodoForm onSubmit={data => console.log(data)} />
      </Modal>
      <OtherModal setToast={setToast} />

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
