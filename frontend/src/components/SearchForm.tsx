import { useState } from 'react';

function SearchForm() {
  const [SearchTerm, setSearchTerm] = useState('');

  return (
    <section className="mt-4 md:mt-6">
      <h2 className="text-2xl font-bold text-slate-700">Search options</h2>

      <form className="bg-white border border-slate-400 rounded-2xl p-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <label className="text-base text-slate-700 font-medium min-w-16">
            Name
          </label>
          <input
            type="text"
            placeholder="Search..."
            value={SearchTerm}
            onChange={evt => setSearchTerm(evt.target.value)}
            className="py-2 px-4 border border-slate-400 rounded-lg w-full lg:max-w-3xl"
          />
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center mt-3">
          <label className="text-base text-slate-700 font-medium min-w-16">
            Priority
          </label>
          <select className="text-slate-700 py-2 px-4 bg-transparent border border-slate-400 rounded-lg w-full sm:w-48 md:w-56 lg:w-64 browser-appearance-none">
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <label className="text-base text-slate-700 font-medium min-w-16">
              State
            </label>
            <select className="text-slate-700 py-2 px-4 bg-transparent border border-slate-400 rounded-lg w-full sm:w-48 md:w-56 lg:w-64 browser-appearance-none">
              <option>All</option>
              <option>Done</option>
              <option>Undone</option>
            </select>
          </div>

          <button className="text-base text-slate-700 font-semibold py-2 px-4 inline-block border border-slate-400 rounded-lg cursor-pointer w-full sm:max-w-2xs sm:ml-auto hover:bg-slate-100">
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
