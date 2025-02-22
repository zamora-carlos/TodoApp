import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import { updateFilter } from '../redux/viewOptionsSlice';
import { changePageAsync } from '../redux/todosSlice';
import type Filter from '../types/Filter';
import type { AppDispatch } from '../redux/store';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priority, setPriority] = useState('ALL');
  const [done, setDone] = useState('ALL');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitForm = (evt: React.FormEvent) => {
    evt.preventDefault();

    const filter: Filter = {
      name: searchTerm.trim() || null,
      priority:
        priority === 'ALL' ? null : (priority as 'LOW' | 'MEDIUM' | 'HIGH'),
      done: done === 'ALL' ? null : done === 'DONE' ? true : false,
    };

    dispatch(updateFilter(filter));
    dispatch(changePageAsync(1));
  };

  return (
    <section className="mt-4 md:mt-6">
      <h2 className="text-2xl font-bold text-slate-700">Search options</h2>

      <form
        className="bg-white border border-slate-300 rounded-2xl p-4 mt-2"
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <label
            htmlFor="text-search"
            className="text-base text-slate-700 font-medium min-w-16"
          >
            Name
          </label>
          <input
            id="text-search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={evt => setSearchTerm(evt.target.value)}
            className="py-2 px-4 border border-slate-300 rounded-lg w-full lg:max-w-3xl"
          />
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center mt-3">
          <label
            htmlFor="priority-select"
            className="text-base text-slate-700 font-medium min-w-16"
          >
            Priority
          </label>
          <div className="relative w-full sm:w-48 md:w-56 lg:w-64 group">
            <select
              id="priority-select"
              className="select text-slate-700 py-2 pl-4 pr-8 w-full lg:w-64"
              onChange={evt => setPriority(evt.target.value)}
            >
              <option value="ALL">All</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <TbTriangleInvertedFilled className="select-icon" />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <label
              htmlFor="status-select"
              className="text-base text-slate-700 font-medium min-w-16"
            >
              Status
            </label>
            <div className="relative w-full sm:w-48 md:w-56 lg:w-64 group">
              <select
                id="status-select"
                className="select text-slate-700 py-2 pl-4 pr-8 w-full lg:w-64"
                onChange={evt => setDone(evt.target.value)}
              >
                <option value="ALL">All</option>
                <option value="DONE">Done</option>
                <option value="UNDONE">Undone</option>
              </select>

              <TbTriangleInvertedFilled className="select-icon" />
            </div>
          </div>

          <button
            type="submit"
            className="text-base text-slate-700 font-medium py-2 px-4 inline-block border border-slate-300 rounded-lg cursor-pointer w-full sm:max-w-2xs sm:ml-auto hover:bg-slate-100"
          >
            <p className="flex items-center gap-2 justify-center">
              Search
              <FaMagnifyingGlass className="w-4 text-slate-700" />
            </p>
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
