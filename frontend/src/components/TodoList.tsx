import Todo from '../types/Todo';

type TodoListProps = {
  todos: Todo[];
};

function TodoList({ todos }: TodoListProps) {
  return (
    <section>
      <div className="flex">
        <div className="ml-auto flex gap-2">
          <p className="text-base text-slate-500">Todos per page</p>
          <select>
            <option selected>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
      </div>

      <div className="border border-slate-300 rounded-2xl overflow-hidden mt-2">
        <table className="w-full">
          <thead className="font-semibold text-slate-700 text-left">
            <tr>
              <th className="py-3 px-4 border-b border-slate-300">State</th>
              <th className="py-3 px-4 border border-y-0 border-slate-300">
                Name
              </th>
              <th className="py-3 px-4 border border-y-0 border-slate-300">
                Priority
              </th>
              <th className="py-3 px-4 border border-y-0 border-slate-300">
                Due date
              </th>
              <th className="py-3 px-4 border-b border-slate-300">Actions</th>
            </tr>
          </thead>

          <tbody className="text-slate-600">
            {todos.map(todo => (
              <tr key={todo.id}>
                <td className="py-2 px-4 border border-l-0 border-b-0 border-slate-300">
                  <input type="checkbox" checked={todo.state} />
                </td>
                <td className="py-2 px-4 border border-b-0 border-slate-300">
                  {todo.name}
                </td>
                <td className="py-2 px-4 border border-b-0 border-slate-300">
                  {todo.priority}
                </td>
                <td className="py-2 px-4 border border-b-0 border-slate-300">
                  {todo.dueDate?.toDateString()}
                </td>
                <td className="py-2 px-4 border border-r-0 border-b-0 border-slate-300">
                  Delete / Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2">
        <p className="text-base text-slate-500">Showing 1 to 10 todos of 43</p>
      </div>
    </section>
  );
}

export default TodoList;
