import { useDispatch, useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { updateSortBy } from '../redux/viewOptionsSlice';
import { getTodosAsync } from '../redux/todosSlice';
import type { AppDispatch, RootState } from '../redux/store';
import type SortCriteria from '../types/SortCriteria';

function TodoListHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { sortBy, order } = useSelector(
    (state: RootState) => state.viewOptions.sortCriteria
  );

  const columnsData: Record<
    SortCriteria['sortBy'],
    { columnName: string; className: string }
  > = {
    TEXT: { columnName: 'Name', className: '' },
    PRIORITY: {
      columnName: 'Priority',
      className: 'w-28 md:w-32 lg:w-36',
    },
    DUE_DATE: {
      columnName: 'Due date',
      className: 'w-44 sm:w-48 md:w-52 lg:w-56 xl:w-60',
    },
  };

  const handleUpdateSorting = (columnName: SortCriteria['sortBy']) => {
    dispatch(updateSortBy(columnName));
    dispatch(getTodosAsync());
  };

  const getArrowClasses = (columnName: SortCriteria['sortBy']) => ({
    up:
      sortBy === columnName && order === 'ASC'
        ? 'text-indigo-500'
        : 'text-slate-300',
    down:
      sortBy === columnName && order === 'DESC'
        ? 'text-indigo-500'
        : 'text-slate-300',
  });

  const getOppositeOrder = (columnName: SortCriteria['sortBy']) => {
    return sortBy === columnName && order === 'ASC'
      ? 'descending'
      : 'ascending';
  };

  return (
    <thead className="font-semibold text-slate-700 text-left">
      <tr>
        <th className="py-3 px-4 border-b border-slate-300 text-center w-24">
          Status
        </th>

        {Object.entries(columnsData).map(
          ([columnKey, { columnName, className }]) => {
            const typedColumnKey = columnKey as SortCriteria['sortBy'];

            return (
              <th
                key={typedColumnKey}
                className={`py-3 px-4 border border-y-0 border-slate-300 cursor-pointer ${className}`}
                onClick={() => handleUpdateSorting(typedColumnKey)}
                role="button"
                aria-label={`Sort by ${columnName} in ${getOppositeOrder(typedColumnKey)} order`}
              >
                <div className="flex items-center gap-1">
                  {columnName}
                  <div className="flex flex-col">
                    <GoTriangleUp
                      className={`${getArrowClasses(typedColumnKey).up} w-5 h-auto`}
                    />
                    <GoTriangleDown
                      className={`${getArrowClasses(typedColumnKey).down} w-5 h-auto -mt-3`}
                    />
                  </div>
                </div>
              </th>
            );
          }
        )}

        <th className="py-3 px-4 border-b border-slate-300 text-center w-30">
          Actions
        </th>
      </tr>
    </thead>
  );
}

export default TodoListHeader;
