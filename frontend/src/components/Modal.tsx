import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import CreateTodo from '../types/TodoPayload';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync, updateTodoAsync } from '../redux/todosSlice';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import { hideModal } from '../redux/modalSlice';

function Modal() {
  const dispatch = useDispatch<AppDispatch>();
  const modalState = useSelector((state: RootState) => state.modal);
  const todos = useSelector((state: RootState) => state.todos.content);

  const [hasDueDate, setHasDueDate] = useState(false);
  const [todo, setTodo] = useState<CreateTodo>({
    text: '',
    priority: 'LOW',
    dueDate: null,
  });

  const existingTodo = modalState.todoId
    ? todos.find(todo => todo.id === modalState.todoId)
    : null;

  useEffect(() => {
    setHasDueDate(!!existingTodo?.dueDate);

    setTodo({
      text: existingTodo?.text || '',
      priority: existingTodo?.priority || 'LOW',
      dueDate: existingTodo?.dueDate || null,
    });
  }, [existingTodo]);

  const handleClick = () => {
    if (modalState.todoId) {
      dispatch(
        updateTodoAsync({
          id: modalState.todoId,
          todo: { ...todo, dueDate: hasDueDate ? todo.dueDate : null },
        })
      );
    } else {
      dispatch(
        addTodoAsync({ ...todo, dueDate: hasDueDate ? todo.dueDate : null })
      );
    }
  };

  return (
    <>
      {modalState.isVisible && (
        <div className="flex items-center justify-center fixed inset-0 bg-slate-400/50">
          <div className="relative px-4 sm:px-5 md:px-6 lg:px-8 py-10 bg-white border border-slate-300 w-9/10 max-w-xl rounded-2xl">
            <button
              tabIndex={0}
              onClick={() => dispatch(hideModal())}
              className="flex items-center justify-center absolute top-2 right-2 w-8 h-8 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 group"
            >
              <IoClose className="group-hover:rotate-90 duration-200 text-slate-500 ease-in-out" />
              <span className="sr-only">Close</span>
            </button>
            <h2 className="text-2xl font-semibold text-slate-700">
              {modalState.todoId !== undefined ? 'Updated todo' : 'Create todo'}
            </h2>
            <div className="flex flex-col mt-4">
              <label className="text-slate-600">Name</label>
              <input
                type="text"
                className="py-2 px-4 mt-1 text-slate-600 bg-white border border-slate-300 rounded-lg focus-visible:ring-2 ring-slate-300"
                placeholder="Your todo..."
                value={todo.text}
                onChange={evt =>
                  setTodo(prevTodo => ({ ...prevTodo, text: evt.target.value }))
                }
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-slate-600">Priority</label>
              <select
                value={todo.priority}
                className="text-slate-600 py-2 px-4 bg-transparent border border-slate-300 rounded-lg w-72 max-w-full browser-appearance-none focus-visible:ring-2 ring-slate-300"
                onChange={evt =>
                  setTodo(prevTodo => {
                    let priority: 'LOW' | 'MEDIUM' | 'HIGH';

                    switch (evt.target.value) {
                      case 'LOW':
                        priority = 'LOW';
                        break;
                      case 'MEDIUM':
                        priority = 'MEDIUM';
                        break;
                      case 'HIGH':
                        priority = 'HIGH';
                        break;
                      default:
                        priority = 'LOW';
                    }

                    return { ...prevTodo, priority };
                  })
                }
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="flex flex-col mt-4">
              <div className="flex items-center">
                <label className="text-slate-600 mr-2">Due date</label>
                <input
                  type="checkbox"
                  checked={hasDueDate}
                  onChange={() =>
                    setHasDueDate(prevHasDueDate => !prevHasDueDate)
                  }
                />
              </div>
              {hasDueDate && (
                <input
                  className="text-slate-600 p-2 border border-slate-300 rounded-lg w-72 max-w-full"
                  type="datetime-local"
                  value={todo.dueDate ?? Date.now()}
                  onChange={evt =>
                    setTodo(prevTodo => ({
                      ...prevTodo,
                      dueDate: evt.target.value,
                    }))
                  }
                />
              )}
            </div>

            <button
              onClick={() => handleClick()}
              className="text-white p-2 border border-slate-300 rounded-lg w-72 max-w-full cursor-pointer mt-8 bg-indigo-500 hover:bg-indigo-400"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
