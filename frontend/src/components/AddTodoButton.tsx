function AddTodoButton() {
  return (
    <button
      onClick={() => alert('No implemented yet')}
      className="bg-white py-2 px-6 border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer"
    >
      <p className="font-semibold text-slate-700 text-lg">New to do</p>
    </button>
  );
}

export default AddTodoButton;
