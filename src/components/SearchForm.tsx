import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Select from '@common/Select';
import { updateFilterAndChangePageAsync } from '@src/redux/thunks';
import { PRIORITY } from '@constants/priority';
import { STATUS } from '@constants/status';
import type { AppDispatch } from '@src/redux/store';
import type { Filter } from '@customTypes/filter';
import type { Priority } from '@customTypes/priority';
import type { Status } from '@customTypes/status';

const ALL_OPTION = 'ALL' as const;
const priorityOptions = [ALL_OPTION, ...Object.values(PRIORITY)];
const statusOptions = [ALL_OPTION, ...Object.values(STATUS)];

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');
  const [done, setDone] = useState<typeof ALL_OPTION | Status>(ALL_OPTION);
  const [priority, setPriority] = useState<typeof ALL_OPTION | Priority>(
    ALL_OPTION
  );

  const handleSubmitForm = (evt: React.FormEvent) => {
    evt.preventDefault();

    const filter: Filter = {
      name: searchTerm.trim() || null,
      priority: priority === ALL_OPTION ? null : priority,
      done: done === ALL_OPTION ? null : done === STATUS.DONE,
    };

    dispatch(updateFilterAndChangePageAsync(filter));
  };

  return (
    <section className="mt-4 md:mt-6">
      <h2 className="text-2xl font-bold text-slate-700">Search options</h2>

      <form
        className="border border-slate-300 rounded-2xl p-4 mt-2"
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col gap-1 text-slate-700 sm:flex-row sm:items-center">
          <label
            htmlFor="text-search"
            className="text-base font-medium min-w-16"
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

        <Select
          id="priority-select"
          label="Priority"
          value={priority}
          options={priorityOptions}
          onChange={setPriority}
          containerClassName="flex flex-col gap-1 text-slate-700 sm:flex-row sm:items-center mt-3"
          labelClassName="text-base font-medium min-w-16"
          selectWrapperClassName="w-full sm:w-48 md:w-56 lg:w-64"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-3">
          <Select
            id="status-select"
            label="Status"
            value={done}
            options={statusOptions}
            onChange={setDone}
            containerClassName="flex flex-col text-slate-700 gap-1 sm:flex-row sm:items-center"
            labelClassName="text-base font-medium min-w-16"
            selectWrapperClassName="w-full sm:w-48 md:w-56 lg:w-64"
          />

          <button
            type="submit"
            className="text-base text-slate-700 font-medium py-2 px-4 inline-block border border-slate-300 rounded-lg cursor-pointer w-full sm:max-w-2xs sm:ml-auto hover:bg-slate-100"
          >
            <p className="flex items-center gap-2 justify-center">
              Search
              <FaMagnifyingGlass className="w-4" />
            </p>
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
