import SearchForm from './components/SearchForm';
import TodoList from './components/TodoList';
import todos from './data/todos';

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold text-slate-800">My todo list</h1>
      <SearchForm />
      <TodoList todos={todos} />
    </>
  );
}

export default App;
