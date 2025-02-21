import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { addTodoAsync, updateTodoAsync } from '../redux/todosSlice';
import { hideModal } from '../redux/modalSlice';
import type { AppDispatch, RootState } from '../redux/store';
import type TodoPayload from '../types/TodoPayload';

type ModalProps = {
  setToast: React.Dispatch<
    React.SetStateAction<{
      message: string;
      type: 'success' | 'error';
    } | null>
  >;
};

function Modal({ setToast }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const modalState = useSelector((state: RootState) => state.modal);
  const { error, content: todos } = useSelector(
    (state: RootState) => state.todos
  );

  const modalRef = useRef<HTMLFormElement | null>(null);
  const [hasDueDate, setHasDueDate] = useState(false);
  const [todo, setTodo] = useState<TodoPayload>({
    text: '',
    priority: 'LOW',
    dueDate: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFadingOut, setIsFadingOut] = useState(false);

  const existingTodo = modalState.todoId
    ? todos.find(todo => todo.id === modalState.todoId)
    : null;

  const closeModal = useCallback(() => {
    setIsFadingOut(true);

    setTimeout(() => {
      setHasDueDate(false);
      setTodo({
        text: '',
        priority: 'LOW',
        dueDate: null,
      });

      dispatch(hideModal());
      setIsFadingOut(false);
      setErrors({});
    }, 300);
  }, [dispatch]);

  const handleClickOutside = useCallback(
    (evt: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(evt.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    if (modalState.isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, modalState.isVisible]);

  useEffect(() => {
    setHasDueDate(!!existingTodo?.dueDate);

    setTodo({
      text: existingTodo?.text || '',
      priority: existingTodo?.priority || 'LOW',
      dueDate: existingTodo?.dueDate || null,
    });
  }, [existingTodo]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!todo.text.trim()) {
      newErrors.text = 'Name is required';
    } else if (todo.text.trim().length < 3 || todo.text.trim().length > 120) {
      newErrors.text = 'Name must be between 3 and 120 characters';
    }

    if (!todo.priority) {
      newErrors.priority = 'Priority is required';
    } else if (!['LOW', 'MEDIUM', 'HIGH'].includes(todo.priority)) {
      newErrors.priority =
        'Priority can only take the value "Low", "Medium", or "High"';
    }

    if (hasDueDate) {
      if (!todo.dueDate) {
        newErrors.dueDate = 'Due date is required';
      } else {
        const currentDate = new Date();
        const dueDate = new Date(todo.dueDate);
        if (dueDate <= currentDate) {
          newErrors.dueDate = 'Due date must be today or in the future';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = async (evt: React.FormEvent<HTMLElement>) => {
    evt.preventDefault();

    if (validateForm()) {
      try {
        if (modalState.todoId) {
          await dispatch(
            updateTodoAsync({
              id: modalState.todoId,
              todo: { ...todo, dueDate: hasDueDate ? todo.dueDate : null },
            })
          ).unwrap();

          setToast({ message: 'Todo updated successfully!', type: 'success' });
        } else {
          await dispatch(
            addTodoAsync({ ...todo, dueDate: hasDueDate ? todo.dueDate : null })
          ).unwrap();

          setToast({ message: 'Todo created successfully!', type: 'success' });
        }
        closeModal();
      } catch {
        setToast({ message: error ?? '', type: 'success' });
      }
    }
  };

  if (!modalState.isVisible) {
    return;
  }

  return (
    <div
      className={`flex items-center justify-center fixed inset-0 bg-slate-400/50 transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      } ${modalState.isVisible ? 'block' : 'none'}`}
      aria-modal="true"
      aria-hidden={!modalState.isVisible}
    >
      <form
        ref={modalRef}
        onSubmit={handleClick}
        aria-labelledby="modal-title"
        role="dialog"
        className={`relative px-4 sm:px-5 md:px-6 lg:px-8 py-10 bg-white border border-slate-300 w-9/10 max-w-xl rounded-2xl transition-opacity duration-400 ${
          isFadingOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          tabIndex={0}
          onClick={closeModal}
          className="flex items-center justify-center absolute top-2 right-2 w-8 h-8 border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 group"
        >
          <IoClose className="group-hover:rotate-90 duration-200 text-slate-500 ease-in-out" />
          <span className="sr-only">Close</span>
        </button>
        <h2 id="modal-title" className="text-2xl font-semibold text-slate-700">
          {modalState.todoId !== null ? 'Updated todo' : 'Create todo'}
        </h2>

        <div className="flex flex-col mt-4">
          <label htmlFor="todo-text" className="text-slate-600">
            Name
          </label>
          <input
            id="todo-text"
            type="text"
            className="py-2 px-4 mt-1 text-slate-600 bg-white border border-slate-300 rounded-lg focus-visible:ring-2 ring-slate-300"
            placeholder="Your todo..."
            value={todo.text}
            onChange={evt =>
              setTodo(prevTodo => ({ ...prevTodo, text: evt.target.value }))
            }
          />
          {errors.text && <p className="text-red-300 text-sm">{errors.text}</p>}
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="todo-priority" className="text-slate-600">
            Priority
          </label>
          <select
            id="todo-priority"
            value={todo.priority}
            className="text-slate-600 py-2 px-4 mt-1 bg-transparent border border-slate-300 rounded-lg w-72 max-w-full browser-appearance-none focus-visible:ring-2 ring-slate-300"
            onChange={evt =>
              setTodo(prevTodo => {
                const priority = evt.target.value as 'LOW' | 'MEDIUM' | 'HIGH';
                return { ...prevTodo, priority };
              })
            }
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-300 text-sm">{errors.priority}</p>
          )}
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex items-center">
            <label className="flex gap-2 text-slate-400 items-center">
              <span className="text-slate-600">Due date</span>
              <input
                type="checkbox"
                checked={hasDueDate}
                onChange={() =>
                  setHasDueDate(prevHasDueDate => !prevHasDueDate)
                }
                className="checkbox"
              />
            </label>
          </div>
          {hasDueDate && (
            <input
              className="text-slate-600 p-2 mt-1 border border-slate-300 rounded-lg w-72 max-w-full"
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
          {errors.dueDate && (
            <p className="text-red-300 text-sm">{errors.dueDate}</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white p-2 border border-slate-300 rounded-lg w-72 max-w-full cursor-pointer mt-8 bg-indigo-500 hover:bg-indigo-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Modal;
