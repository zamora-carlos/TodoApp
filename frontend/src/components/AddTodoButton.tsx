import { FaPlus } from 'react-icons/fa6';

type AddTodoButtonProps = {
  onClick: () => void;
};

function AddTodoButton({ onClick }: AddTodoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center bg-transparent py-2 px-6 border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer"
    >
      <FaPlus className="text-slate-700 w-4 h-auto" />
      <p className="font-semibold text-slate-700 text-lg">New to do</p>
    </button>
  );
}

export default AddTodoButton;
