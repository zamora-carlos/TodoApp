import React, { useState } from 'react';

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ showModal, setShowModal }: ModalProps) {
  const [hasDueDate, setHasDueDate] = useState(false);

  if (!showModal) {
    return;
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-slate-400/50">
      <div className="relative px-4 sm:px-5 md:px-6 lg:px-8 py-10 bg-white border border-slate-300 w-9/10 max-w-xl rounded-2xl">
        <button
          tabIndex={0}
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 w-8 h-8 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100"
        >
          x <span className="sr-only">Close</span>
        </button>
        <h2 className="text-2xl font-semibold text-slate-700">Create todo</h2>
        <div className="flex flex-col mt-4">
          <label className="text-slate-600">Name</label>
          <input
            type="text"
            className="py-2 px-4 mt-1 text-slate-600 bg-white border border-slate-300 rounded-lg focus-visible:ring-2 ring-slate-300"
            placeholder="Your todo..."
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-slate-600">Priority</label>
          <select className="text-slate-600 py-2 px-4 bg-transparent border border-slate-300 rounded-lg w-72 max-w-full browser-appearance-none focus-visible:ring-2 ring-slate-300">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex items-center">
            <label className="text-slate-600 mr-2">Due date</label>
            <input
              type="checkbox"
              checked={hasDueDate}
              onChange={() => setHasDueDate(prevHasDueDate => !prevHasDueDate)}
            />
          </div>
          {hasDueDate && (
            <input
              className="text-slate-600 p-2 border border-slate-300 rounded-lg w-72 max-w-full"
              type="datetime-local"
            />
          )}
        </div>

        <button className="text-white p-2 border border-slate-300 rounded-lg w-72 max-w-full cursor-pointer mt-8 bg-indigo-500 hover:bg-indigo-400">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Modal;
