import { Routes, Route } from 'react-router-dom';
import DashboardPage from '@pages/DashboardPage';
import TodosPage from '@pages/TodosPage';
import Layout from '@components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TodosPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
