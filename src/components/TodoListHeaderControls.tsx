import React from 'react';
import { useDispatch } from 'react-redux';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import AddTodoButton from './AddTodoButton';
import { changePageSizeAsync } from '../redux/todosSlice';
import { showCreateModal } from '../redux/modalSlice';
import type { AppDispatch } from '../redux/store';

function TodoListHeaderControls() {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangePageSize = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const pageSize = parseInt(evt.target.value);
    dispatch(changePageSizeAsync(pageSize));
  };

  return (
    <div className="flex items-center justify-between">
      <AddTodoButton onClick={() => dispatch(showCreateModal())} />
      <div className="flex items-center gap-2">
        <label htmlFor="items-per-page" className="text-base text-slate-500">
          Todos per page
        </label>
        <div className="relative group">
          <select
            id="items-per-page"
            className="text-slate-500 p-2 pr-6 bg-transparent border border-slate-300 rounded-lg browser-appearance-none"
            onChange={handleChangePageSize}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <TbTriangleInvertedFilled className="select-icon" />
        </div>
      </div>
    </div>
  );
}

export default TodoListHeaderControls;
